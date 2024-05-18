import { ClerkExpressRequireAuth } from "@clerk/clerk-sdk-node";
import express from "express";
const router = express.Router();

router.get("/funding-opportunities", ClerkExpressRequireAuth() , (req, res) => {
    const applicant_id = req.auth.userId;
    
    req.db.query(
        `SELECT fo.*, 
            (SELECT status 
            FROM funding_applications fa 
            WHERE fa.fund_id = fo.id AND fa.applicant_id = ?) AS application_status
        FROM funding_opportunities fo 
        WHERE fo.deadline >= CURDATE();`, [applicant_id], (err, result) => {
            if (err) {
                console.error("Error querying database:", err);
                res.status(500).json({ error: "Internal Server Error" });
                return;
            }
            res.json(result);
        }
    );
});


export default router;