import express from "express";
import { db } from "../../db/index.js";
const router = express.Router();

router.get("/overview-data", (req, res, next) => {
  const id = req.auth.userId;
  // const id = "user1"; // For testing purposes

  // Query for currently funding opportunities
  db.query(
    `
      SELECT COUNT(*) AS currentlyFunding
      FROM funding_applications WHERE status = 'approved' AND fund_id IN (
        SELECT id
        FROM funding_opportunities
        WHERE manager_id = ?
      );
    `,
    [id],
    (err, result) => {
      if (err) return next(err);
      const currentlyFunding = result[0].currentlyFunding;

      // Query for unattended applications with status 'pending'
      db.query(
        `
          SELECT COUNT(*) AS unattendedApplications
          FROM funding_applications
          WHERE status = 'pending'
          AND fund_id IN (
            SELECT id
            FROM funding_opportunities
            WHERE manager_id = ?
          );
        `,
        [id],
        (err, result) => {
          if (err) return next(err);
          const unattendedApplications = result[0].unattendedApplications;

          // Query for total applications received
          db.query(
            `
              SELECT COUNT(*) AS totalApplications
              FROM funding_applications
              WHERE fund_id IN (
                SELECT id
                FROM funding_opportunities
                WHERE manager_id = ?
              );
            `,
            [id],
            (err, result) => {
              if (err) return next(err);
              const totalApplications = result[0].totalApplications;

              // Query for total funding opportunities with deadline check
              db.query(
                `
                  SELECT COUNT(*) AS totalFundingOpportunities
                  FROM funding_opportunities
                  WHERE manager_id = ?
                  AND deadline >= CURRENT_DATE;
                `,
                [id],
                (err, result) => {
                  if (err) return next(err);
                  const totalFundingOpportunities =
                    result[0].totalFundingOpportunities;

                  // Send the combined response
                  res.json({
                    currentlyFunding,
                    unattendedApplications,
                    totalApplications,
                    totalFundingOpportunities,
                  });
                }
              );
            }
          );
        }
      );
    }
  );
});

export default router;
