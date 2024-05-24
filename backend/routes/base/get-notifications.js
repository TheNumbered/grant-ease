import { ClerkExpressRequireAuth } from "@clerk/clerk-sdk-node";
import express from "express";
const router = express.Router();

// Route to get applications from the database for the current user by id
router.get("/notifications",
    ClerkExpressRequireAuth(), 
    (req, res) => {
    const id = req.auth.userId;
    
    // Perform the SELECT query to get notifications
    req.db.query("SELECT n.*, fo.title FROM notifications n LEFT JOIN funding_opportunities fo ON n.fund_id = fo.id WHERE n.user_id = ? ORDER BY time_posted DESC", [id], (err, notifications) => {
        if (err) {
            console.error("Error querying database:", err);
            return res.status(500).json({ error: "Internal Server Error" });
        }
        
        // Perform the UPDATE query to mark notifications as seen
        req.db.query("UPDATE notifications SET seen = 1 WHERE user_id = ?", [id], (err) => {
            if (err) {
                console.error("Error updating database:", err);
                return res.status(500).json({ error: "Internal Server Error" });
            }

            // Perform the SELECT query to count unseen notifications
            req.db.query("SELECT COUNT(*) AS unseen_count FROM notifications WHERE user_id = ? AND seen = 0", [id], (err, result) => {
                if (err) {
                    console.error("Error querying database for unseen count:", err);
                    return res.status(500).json({ error: "Internal Server Error" });
                }

                const unseenCount = result[0].unseen_count;
                
                // Send the response with the notifications and the unseen count
                res.json({ notifications, unseenCount });
            });
        });
    });
});


router.get('/UnseenNotificationsCount', ClerkExpressRequireAuth() ,(req, res) => {
    const id = req.auth.userId;
    req.db.query("SELECT COUNT(*) AS unseen_count FROM notifications WHERE user_id = ? AND seen = 0", [id], (err, result) => {
        if (err) {
            console.error("Error querying database for unseen count:", err);
            return res.status(500).json({ error: "Internal Server Error" });
        }

        const unseenCount = result[0].unseen_count;
        
        // Send the response with the notifications and the unseen count
        res.json({ unseenCount });
    });
});

export default router;