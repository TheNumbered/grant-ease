import express from 'express';
const router = express.Router();

router.get("/balance-change", async (req, res) => {
    const id = req.auth.userId;
    const query = `
    SELECT 
    SUM(fo.amount) AS total_amount_spent,
    u.balance AS current_balance
    FROM 
        funding_applications fa
    JOIN 
        funding_opportunities fo ON fa.fund_id = fo.id
    JOIN 
        user u ON fo.manager_id = u.id
    WHERE 
        fa.status = 'approved'
        AND u.id = ?;
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