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

// Route to all get applications by fund id
router.get("/applications/:id", (req, res, next) => {
  const id = req.auth.userId;
  const fundId = req.params.id;
  req.db.query(
    `
    SELECT fa.*, u.full_name
    FROM funding_applications fa
    JOIN funding_opportunities fo ON fa.fund_id = fo.id
    JOIN user u ON fa.applicant_id = u.id
    WHERE fo.manager_id = ? 
    AND fa.status = 'pending'
    AND fo.id = ?;
    `,
    [id, fundId],
    (err, result) => {
      if (err) return next(err);
      res.json(result);
    }
  );
});
router.put("/approve-application/:id", (req, res, next) => {
  const manager_id = req.auth.userId;
  const application_id = req.params.id;

  // Query to check the manager's balance and the amount required for the application
  req.db.query(
    `
    SELECT u.balance, fo.amount
    FROM user u
    JOIN funding_opportunities fo ON fo.manager_id = u.id
    JOIN funding_applications fa ON fa.fund_id = fo.id
    WHERE u.id = ? AND fa.id = ?;
    `,
    [manager_id, application_id],
    (err, result) => {
      if (err) return next(err);
      
      const { balance, amount } = result[0];
    
      if (parseInt(balance) >= parseInt(amount)) { // Check if balance is sufficient or if amount is null
        // deduct the amount from the manager's balance
        // and update the application status to approved

        req.db.query(
          `
          UPDATE user
          SET balance = balance - ?
          WHERE id = ?;
          `,
          [amount, manager_id],
          (err) => {
            if (err) return next(err);
            req.db.query(
              `
              UPDATE funding_applications
              SET status = 'approved'
              WHERE id = ?;
              `,
              [application_id],
              (err) => {
                if (err) return next(err);
                res.json({ message: "Application approved" });
              }
            );
          }
        );
      } else {
        res.json({ message: "Insufficient balance" });
      }
    }
  );
});


router.put("/reject-application/:id", (req, res, next) => {
  const application_id = req.params.id;
  req.db.query(
    `
    UPDATE funding_applications
    SET status = 'rejected'
    WHERE id = ?;
    `,
    [application_id],
    (err, result) => {
      if (err) return next(err);
      res.json({ message: "Application rejected" });
    }
  );
});

export default router;
