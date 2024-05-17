import express from "express";
import { db } from "../../db/index.js";
const router = express.Router();

// Route to get funding opportunities title from the database by the fund manager id
router.get("/get-funding-opportunities", (req, res) => {
  // const id = req.auth.userId;
  const id = "user1";
  db.query(
    "SELECT id, title FROM funding_opportunities WHERE manager_id = ?",
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

// router that get the number of applications for each funding opportunity
router.get("/get-num-applicants", (req, res) => {
  // const id = req.auth.userId;
  const id = "user1";
  db.query(
    `
    SELECT COUNT(*) AS num_applicants
    FROM funding_opportunities AS fo
    JOIN funding_applications AS fa ON fo.id = fa.fund_id
    WHERE fo.manager_id = ?;

    `,
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
