import express from "express";
const router = express.Router();

// Route to get funding balance from the database by the fund manager id
router.get("/balance", (req, res) => {
  const id = req.auth.userId;
  //const id = "1";
  req.db.query(
    "SELECT balance FROM fund_manager_info WHERE manager_id = ?",
    [id],
    (err, result) => {
      if (err) {
        console.error("Error querying database:", err);
        res.status(500).json({ error: "Internal Server Error" });
        return;
      }
      res.json(result);
    }
  );
});

// router that adds balance to the fund manager account
router.post("/add-balance", (req, res) => {
  const id = req.auth.userId;
  //const id = "1";
  const { amount } = req.body;
  console.log(req.body);
  if (!amount) {
    res.status(400).json({ error: "Amount is required" });
    return;
  }
  req.db.query(
    "UPDATE fund_manager_info SET balance = balance + ? WHERE manager_id = ?",
    [amount, id],
    (err, result) => {
      if (err) {
        console.error("Error querying database:", err);
        res.status(500).json({ error: "Internal Server Error" });
        return;
      }
      res.json({ message: "Balance added successfully" });
    }
  );
});

// router that deducts balance from the fund manager account
router.post("/deduct-balance", (req, res) => {
  const id = req.auth.userId; // Assuming userId is obtained from authentication
  //const id = "1"; // For testing, replace "1" with the actual user ID obtained from authentication
  const { amount } = req.body;

  if (!amount) {
    res.status(400).json({ error: "Amount is required" });
    return;
  }

  // Check if there is sufficient balance
  req.db.query(
    "SELECT balance FROM fund_manager_info WHERE manager_id = ?",
    [id],
    (err, rows) => {
      if (err) {
        console.error("Error querying database:", err);
        res.status(500).json({ error: "Internal Server Error" });
        return;
      }

      if (rows.length === 0) {
        res.status(404).json({ error: "User not found" });
        return;
      }

      const currentBalance = rows[0].balance;

      if (currentBalance < amount) {
        res.status(400).json({ message: "Insufficient balance" });
        return;
      }

      // Deduct the balance
      req.db.query(
        "UPDATE fund_manager_info SET balance = balance - ? WHERE manager_id = ?",
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

// router that gets the amount
router.get("/get-amount", (req, res) => {
  const id = req.auth.userId;
  //const id = "1";
  req.db.query(
    "SELECT amount FROM funding_opportunities WHERE id = ?",
    [id],
    (err, result) => {
      if (err) {
        console.error("Error querying database:", err);
        res.status(500).json({ error: "Internal Server Error" });
        return;
      }
      res.json(result);
    }
  );
});

export default router;
