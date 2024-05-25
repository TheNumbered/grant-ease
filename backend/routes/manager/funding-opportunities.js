import express from "express";
import { db } from "../../db/index.js";
const router = express.Router();

// Route to get funding opportunities title from the database by the fund manager id
router.get("/funding-opportunities", (req, res, next) => {
  const id = req.auth.userId;
  //const id = "user1";
  db.query(
    `
    SELECT fo.id, fo.title, COUNT(fa.id) AS numApplicants
    FROM funding_opportunities AS fo
    LEFT JOIN funding_applications AS fa ON fo.id = fa.fund_id AND fa.status = 'pending'
    OR fa.status = 'approved' WHERE fo.manager_id = ?
    GROUP BY fo.id, fo.title;
    `,
    [id],
    (err, result) => {
      if (err) return next(err);
      res.json(result);
    }
  );
});

router.delete("/funding-opportunities/:id", (req, res, next) => {
  const id = req.params.id;
  const manager_id = req.auth.userId;
  db.query(
    `
    DELETE FROM funding_opportunities
    WHERE id = ? AND manager_id = ?;
    `,
    [id, manager_id],
    (err, result) => {
      if (err) return next(err);
      res.json(result);
      console.log(`err: ${err} `);
    }
  );
});

export default router;
