import { ClerkExpressRequireAuth } from "@clerk/clerk-sdk-node";
import express from "express";
const router = express.Router();

// Route to get applications from the database for the current user by id
router.get("/notifications",ClerkExpressRequireAuth(), (req, res) => {
    const id = req.auth.userId;
    
    // Perform the SELECT query
    req.db.query("SELECT * from notifications WHERE user_id = ?", [id], (err, notifications) => {
        if (err) {
            console.error("Error querying database:", err);
            return res.status(500).json({ error: "Internal Server Error" });
        }
        
        // Perform the UPDATE query
        req.db.query("UPDATE notifications SET seen = 0 WHERE user_id = ?", [id], (err) => {
            if (err) {
                console.error("Error updating database:", err);
                return res.status(500).json({ error: "Internal Server Error" });
            }
            
            // Send the response with the notifications
            res.json({ notifications, message: "Notifications have been marked as seen" });
        });
    });
});


export default router;