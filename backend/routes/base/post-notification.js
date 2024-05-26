import { ClerkExpressRequireAuth } from "@clerk/clerk-sdk-node";
import express from "express";
const router = express.Router();

router.post("/notify",
    ClerkExpressRequireAuth(),
    (req, res) => {
    const { target_user_id, type, fund_id, application_id } = req.body;

    // Validate required parameters based on type
    if (!validateRequiredParameters(target_user_id, type, fund_id, application_id)) {
        return res.status(400).json({ error: "Missing required parameters" });
    }

    // Determine the body content and user_id based on type
    let { body, user_id, targetAdmins } = determineBodyAndUserId(type, target_user_id, application_id, req.auth.userId);

    
    // Get the current timestamp for time_posted
    const time_posted = new Date();

    if(!application_id){
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
    }else{
        req.db.query("SELECT * FROM funding_applications WHERE id = ?", [application_id], (err, applicantData) => {
            if (err) {
                console.error("Error querying user role:", err);
                return res.status(500).json({ error: "Internal Server Error" });
            }
            user_id =  applicantData[0].applicant_id;
            const fund = applicantData[0].fund_id;

            req.db.query(
                "INSERT INTO notifications (user_id, fund_id, body, time_posted, target_admins, seen) VALUES (?, ?, ?, ?, ?, 0)", 
                [user_id, fund, body, time_posted, targetAdmins],
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
    }


});

function validateRequiredParameters(target_user_id, type, fund_id, application_id) {
    if (!type) return false;
    if(type === "approved application" || type === "rejected application"){
        if(!application_id ) return false;
    }else if(type === "new applicant" && !fund_id){
        return false;
    }else if(type === "approved fund manager" || type === "rejected fund manager"){
        if(!target_user_id) return false;
    }
    return true;
}

function determineBodyAndUserId(type, target_user_id, application_id, my_user_id) {
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
            user_id = my_user_id;
            break;
        case "approved fund manager":
            body = "Your are now a Fund Manager!";
            break;
        case "rejected fund manager":
            body = "Your request to be a Fund Manager was rejected";
            break;
        case "fund manager role request":
            body = "New Request To Become A Fund Manager";
            user_id =  my_user_id;
            targetAdmins = 1;
            break;
        default:
            throw new Error("Invalid notification type");
    }
    return { body, user_id, targetAdmins };
}

function getApplicantIdByApplicationId(req, application_id, callback) {
    // Perform a database query to fetch the applicant_id based on the application_id
    req.db.query(
        "SELECT applicant_id FROM funding_applications WHERE id = ?",
        [application_id],
        (err, result) => {
            if (err) {
                console.error("Error fetching applicant_id:", err);
                return callback(err, null);
            }
            if (result.length === 0) {
                return callback(null, null); // Application not found
            }
            const applicant_id = result[0].applicant_id;
            callback(null, applicant_id);
        }
    );
}



export default router;
