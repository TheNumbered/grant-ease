import express from 'express';
const router = express.Router();

router.get("/funding-balance", async (req, res) => {
    // const id = req.auth.userId;
    const id = "user2";
    const query = `
        SELECT  manager_id,balance
        FROM fund_manager_info
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