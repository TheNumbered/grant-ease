import { ClerkExpressRequireAuth } from "@clerk/clerk-sdk-node";
import express from "express";
const router = express.Router();

// Route to get applications from the database for the current user by id
router.get("/notifications",
    ClerkExpressRequireAuth(), 
    (req, res) => {
        const id = req.auth.userId;

        // Check if the user has the role 'admin'
        req.db.query("SELECT role FROM user WHERE id = ?", [id], (err, result) => {
            if (err) {
                console.error("Error querying user role:", err);
                return res.status(500).json({ error: "Internal Server Error" });
            }

            // Extract the role from the result
            const userRole = result[0].role;

            // Perform the SELECT query to get notifications
            let query = "SELECT n.*, fo.title FROM notifications n LEFT JOIN funding_opportunities fo ON n.fund_id = fo.id WHERE (n.user_id = ?) OR (n.fund_id IN (SELECT id FROM funding_opportunities WHERE manager_id = ?))";

            // Only include notifications with target_admins = 1 if user has the 'admin' role
            const queryParams = [id, id];
            if (userRole === 'admin') {
                query += " OR n.target_admins = 1";
            }

            query += " ORDER BY n.time_posted DESC";

            req.db.query(query, queryParams, (err, notifications) => {
                if (err) {
                    console.error("Error querying database:", err);
                    return res.status(500).json({ error: "Internal Server Error" });
                }
                
                let query2 = "UPDATE notifications SET seen = 1 WHERE (user_id = ? OR fund_id IN (SELECT id FROM funding_opportunities WHERE manager_id = ?))";
                if (userRole === 'admin') {
                    query2 += "OR target_admins = 1";
                }

                // Perform the UPDATE query to mark notifications as seen
                req.db.query(query2, [id,id], (err) => {
                    if (err) {
                        console.error("Error updating database:", err);
                        return res.status(500).json({ error: "Internal Server Error" });
                    }

                    // Perform the SELECT query to count unseen notifications
                    req.db.query("SELECT COUNT(*) AS unseen_count FROM notifications WHERE user_id = ? OR fund_id IN (SELECT id FROM funding_opportunities WHERE manager_id = ?) AND seen = 0", [id,id], (err, result) => {
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
    });



router.get('/unseenNotificationsCount', 
    ClerkExpressRequireAuth() , 
    (req, res) => {
    const id = req.auth.userId;

    req.db.query("SELECT role FROM user WHERE id = ?", [id], (err, result) => {
        if (err) {
            console.error("Error querying user role:", err);
            return res.status(500).json({ error: "Internal Server Error" });
        }

        // Extract the role from the result
        const userRole = result[0].role;

        // Perform the SELECT query to get notifications
        let query = "SELECT COUNT(*) AS unseen_count FROM notifications n LEFT JOIN funding_opportunities fo ON n.fund_id = fo.id WHERE seen = 0 AND ((n.user_id = ?) OR (n.fund_id IN (SELECT id FROM funding_opportunities WHERE manager_id = ?))";

        // Only include notifications with target_admins = 1 if user has the 'admin' role
        const queryParams = [id, id];
        if (userRole === 'admin') {
            query += " OR n.target_admins = 1";
        }

        query += ") ORDER BY n.time_posted DESC"; 
        req.db.query(query, queryParams, (err, result) => {
            if (err) {
                console.error("Error querying database:", err);
                return res.status(500).json({ error: "Internal Server Error" });
            }
            const unseenCount = result[0].unseen_count;
            res.json({ unseenCount });
        });
    });
});

export default router;