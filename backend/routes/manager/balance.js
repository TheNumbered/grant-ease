import express from "express";
const router = express.Router();

// router that gets the balance of the fund manager account
router.get("/balance", (req, res) => {
  const id = req.auth.userId;
  req.db.query(
    "SELECT balance FROM user WHERE id = ?",
    [id],
    (err, rows) => {
      if (err) {
        res.status(500).json({ error: "Internal Server Error" });
        return;
      }
      res.json(rows[0]);
    }
  );
});

// router that adds balance to the fund manager account
router.post("/add-balance", (req, res) => {
  const id = req.auth.userId;
  const { amount } = req.body;

  if (!amount) {
    res.status(400).json({ error: "Amount is required" });
    return;
  }
  req.db.query(
    "UPDATE user SET balance = balance + ? WHERE  id = ?",
    [amount, id],
    (err, result) => {
      if (err) {
        res.status(500).json({ error: "Internal Server Error" });
        return;
      }
      res.json({ message: "Balance added successfully" });
    }
  );
});

// router that deducts balance from the fund manager account
router.post("/deduct-balance", (req, res) => {
  const id = req.auth.userId; 
  const { amount } = req.body;

  if (!amount) {
    res.status(400).json({ error: "Amount is required" });
    return;
  }

  // Check if there is sufficient balance
  req.db.query(
    "SELECT balance FROM user WHERE id = ?",
    [id],
    (err, rows) => {
      if (err) {
        res.status(500).json({ error: "Internal Server Error" });
        return;
      }

      const currentBalance = rows[0].balance;

      if (currentBalance < amount) {
        res.status(400).json({ message: "Insufficient balance" });
        return;
      }

      // Deduct the balance
      req.db.query(
        "UPDATE user SET balance = balance - ? WHERE id = ?",
        [amount, id],
        (err, result) => {
          if (err) {
            console.error("Error querying database:", err);
            res.status(500).json({ error: "Internal Server Error" });
            return;
          }
          res.json({ message: "Balance deducted successfully" });
        }
      );
    }
  );
});


export default router;
