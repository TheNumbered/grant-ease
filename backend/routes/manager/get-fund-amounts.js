import express from "express";
const router = express.Router();

router.get("/fund-amounts", async (req, res) => {
  // const id  = req.auth.userId;
  const id = "user2";
  const query = `
    SELECT title, amount
    FROM funding_opportunities
    WHERE manager_id = ?
  `;
  req.db.query(query, [id], (err, result) => {
    if (err) {
      console.log(err);
      res.status(500).send("Internal Server Error");
    } else {
      res.send(result);
    }
  });
});

export default router;
