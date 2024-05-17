import { ClerkExpressRequireAuth } from "@clerk/clerk-sdk-node";
import express from "express";
import { db } from "../../db/index.js";
const router = express.Router();

/*
SELECT fa.*, u.full_name
FROM funding_applications fa
JOIN funding_opportunities fo ON fa.fund_id = fo.id
JOIN user u ON fa.applicant_id = u.id
WHERE fo.manager_id = 'user1'
AND fa.status = 'Pending';
*/
router.get("/applications", ClerkExpressRequireAuth(), (req, res) => {
  // const id = req.auth.userId;
  const id = "user1";
  db.query(
    `
    SELECT fa.*, u.full_name
    FROM funding_applications fa
    JOIN funding_opportunities fo ON fa.fund_id = fo.id
    JOIN user u ON fa.applicant_id = u.id
    WHERE fo.manager_id = ? 
    AND fa.status = 'Pending';

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

router.get("/fund-ad-amount", (req, res) => {
  db.query("SELECT amount, id FROM funding_opportunities", (err, result) => {
    if (err) {
      console.error("Error querying database:", err);
      res.status(500).json({ error: "Internal Server Error" });
      return;
    }
    res.json(result);
  });
});

router.post(
  "/update-applications",
  // ClerkExpressRequireAuth(),
  async (req, res) => {
    const { ids, newStatus } = req.body;

    if (!ids || !newStatus) {
      return res.status(400).json({ message: "Missing required parameters" });
    }

    db.query(
      "UPDATE funding_applications SET status = ? WHERE id IN (?)",
      [newStatus, ids],
      (err, result) => {
        if (err) {
          console.error(err);
          res.status(500).send("Internal Server Error");
        } else {
          res.json({ message: "Status updated successfully" });
        }
      }
    );
  }
);

export default router;
