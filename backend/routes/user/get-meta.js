import express from "express";
const router = express.Router();

router.get("/meta",  (req, res) => {
  const id = req.auth.userId;
  const full_name = req.auth.userFullName;

  req.db.query("SELECT * FROM user WHERE id = ?", [id], (err, result) => {
    if (err) {
      console.error("Error querying database:", err);
      res.status(500).json({ error: "Internal Server Error" });
      return;
    }

    if (result.length === 0) {
      // First user to sign in becomes an admin
      req.db.query("SELECT COUNT(*) as count FROM user", (err, countResult) => {
        if (err) {
          console.error("Error querying database:", err);
          res.status(500).json({ error: "Internal Server Error" });
          return;
        }

        const role = countResult[0].count === 0 ? "admin" : "user";
        req.db.query(
          "INSERT INTO user SET ?",
          { id, role, full_name },
          (err, insertResult) => {
            if (err) {
              console.error("Error inserting into database:", err);
              res.status(500).json({ error: "Internal Server Error" });
              return;
            }
            res.json({ id, role, is_banned: 0, full_name });
          }
        );
      });
    } else {
      res.json(result[0]);
    }
  });
});

export default router;
