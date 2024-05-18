import express from "express";
const router = express.Router();

router.get("/approved-applicants", async (req, res) => {
  const  id = req.auth.userId;
  const query = `
    SELECT fo.title, COUNT(fa.id) AS approved_applicants
    FROM funding_opportunities fo
    LEFT JOIN funding_applications fa ON fo.id = fa.fund_id
    WHERE fo.manager_id = ? AND fa.status = 'approved'
    GROUP BY fo.title
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
