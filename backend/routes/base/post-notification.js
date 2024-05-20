import express from "express";
const router = express.Router();

router.post("/notify", (req, res) => {
    const { user_id, type, fund_id } = req.body;
    console.log(req.body);
    // Validate required parameters based on type
    if (!user_id || (type === "approved application" && !fund_id) || (type === "rejected application" && !fund_id) || (type === "new applicant" && !fund_id)) {
        return res.status(400).json({ error: "Missing required parameters" });
    }

    // Determine the body content based on type
    let body = "";
    switch (type) {
        case "approved application":
            body = "Your Application has been approved";
            break;
        case "rejected application":
            body = "Your Application has been rejected";
            break;
        case "new applicant":
            body = "There is a new applicant";
            break;
        default:
            return res.status(400).json({ error: "Invalid notification type" });
    }

    // Get the current timestamp for time_posted
    const time_posted = new Date();

    // Perform the INSERT query
    req.db.query("INSERT INTO notifications (user_id, fund_id, body, time_posted, target_admins, seen) VALUES (?, ?, ?, ?, 0, 0)", 
    [user_id, fund_id, body, time_posted], (err, result) => {
        if (err) {
            console.error("Error inserting into database:", err);
            return res.status(500).json({ error: "Internal Server Error" });
        }

        // Send a success response
        res.status(201).json({ message: "Notification created successfully", notificationId: result.insertId });
    });
});

export default router;
