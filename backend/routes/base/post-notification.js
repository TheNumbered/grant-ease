import express from "express";
const router = express.Router();

router.post("/notify", (req, res) => {
    const { target_user_id, type, fund_id } = req.body;
    console.log(target_user_id);
    // Validate required parameters based on type
    if (!validateRequiredParameters(target_user_id, type, fund_id)) {
        return res.status(400).json({ error: "Missing required parameters" });
    }

    // Determine the body content and user_id based on type
    let { body, user_id, targetAdmins } = determineBodyAndUserId(type, target_user_id);

    // Get the current timestamp for time_posted
    const time_posted = new Date();

    // Perform the INSERT query
    req.db.query(
        "INSERT INTO notifications (user_id, fund_id, body, time_posted, target_admins, seen) VALUES (?, ?, ?, ?, ?, 0)", 
        [user_id, fund_id, body, time_posted, targetAdmins],
        (err, result) => {
            if (err) {
                console.error("Error inserting into database:", err);
                return res.status(500).json({ error: "Internal Server Error" });
            }
            // Send a success response
            res.status(201).json({ message: "Notification created successfully", notificationId: result.insertId });
        }
    );
});

function validateRequiredParameters(target_user_id, type, fund_id) {
    if (!type) return false;
    if ((type === "approved application" || type === "rejected application" || type === "new applicant") && !fund_id) return false;
    if(!target_user_id && (type !== "new applicant" && type !== "fund manager role request")) return false;
    return true;
}

function determineBodyAndUserId(type, target_user_id) {
    let body = "";
    let user_id = target_user_id;
    let targetAdmins = 0;

    switch (type) {
        case "approved application":
            body = "Your Application has been approved";
            break;
        case "rejected application":
            body = "Your Application has been rejected";
            break;
        case "new applicant":
            body = "There is a new applicant";
            user_id = "user2";
            // user_id = req.auth.userId;
            break;
        case "approved fund manager":
            body = "Your are now a Fund Manager!";
            break;
        case "rejected fund manager":
            body = "Your request to be a Fund Manager was rejected";
            break;
        case "fund manager role request":
            body = "New Request To Become A Fund Manager";
            user_id = "user8";
            // user_id = req.auth.userId;
            targetAdmins = 1;
            break;
        default:
            throw new Error("Invalid notification type");
    }

    return { body, user_id, targetAdmins };
}


export default router;
