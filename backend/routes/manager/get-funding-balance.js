import express from 'express';
const router = express.Router();

router.get("/funding-balance", async (req, res) => {
    const id = req.auth.userId;
    const query = `
        SELECT  manager_Id,balance,names
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