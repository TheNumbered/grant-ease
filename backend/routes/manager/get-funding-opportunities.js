import express from "express";
import { db } from "../../db/index.js";
const router = express.Router();


router.get("/fund-ad-amount", (req, res, next) => {
  req.db.query("SELECT amount, id FROM funding_opportunities", (err, result) => {
    if (err) return next(err);
    res.json(result);
  });
});

// Route to get funding opportunities title from the database by the fund manager id
router.get("/get-funding-opportunities", (req, res, next) => {
  // const id = req.auth.userId;
  const id = "user2";
  //const id = "user1";
  db.query(
    "SELECT id, title FROM funding_opportunities WHERE manager_id = ?",
    [id],
    (err, result) => {
      if (err) return next(err);
      res.json(result);
    }
  );
});

router.get("/get-num-applicants", (req, res, next) => {
  // const id = req.auth.userId;
  const id = "user2";
  //const id = "user1";
  db.query(
    `
    SELECT COUNT(*) AS num_applicants
    FROM funding_opportunities AS fo
    JOIN funding_applications AS fa ON fo.id = fa.fund_id
    WHERE fo.manager_id = ?;
    `,
    [id],
    (err, result) => {
      if (err) return next(err);
      res.json(result);
    }
  );
});

export default router;
