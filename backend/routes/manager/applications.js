import express from "express";
const router = express.Router();

router.get("/applications", (req, res, next) => {
  const id = req.auth.userId;
  req.db.query(
    `
    SELECT fa.*, u.full_name
    FROM funding_applications fa
    JOIN funding_opportunities fo ON fa.fund_id = fo.id
    JOIN user u ON fa.applicant_id = u.id
    WHERE fo.manager_id = ? 
    AND fa.status = 'pending';
    `,
    [id],
    (err, result) => {
      if (err) return next(err);
      res.json(result);
    }
  );
});

router.post("/update-applications", (req, res, next) => {
  const { ids, newStatus } = req.body;

  if (!ids || !newStatus) {
    return res.status(400).json({ message: "Missing required parameters" });
  }

  req.db.query(
    "UPDATE funding_applications SET status = ? WHERE id IN (?)",
    [newStatus, ids],
    (err, result) => {
      if (err) return next(err);
      res.json({ message: "Status updated successfully" });
    }
  );
});

export default router;
