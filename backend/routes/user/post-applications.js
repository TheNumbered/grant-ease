import express from "express";
import fs from "fs";
import multer, { diskStorage } from "multer";
import path from "path";
const router = express.Router();


// Multer storage configuration
const storage = diskStorage({
    destination: (req, file, cb) => {
        const dir = `uploads/user_documents/${req.auth.userId}`;
        fs.mkdirSync(dir, { recursive: true });
        cb(null, dir);
    },
    filename: (req, file, cb) => {
        cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname));
    }
}); 

// Multer upload instance
const upload = multer({ storage: storage });


router.post("/applications", upload.array("attachments", 5), (req, res) => {
    // const applicant_id = req.auth.userId;
    const applicant_id = "user2";
    const { fund_id} = req.body;

    const attachments = req.files.map(file => file.path);

    req.db.query(
        "SELECT * FROM funding_applications WHERE applicant_id = ? AND fund_id = ?",
        [applicant_id, fund_id],
        (err, result) => {
            if (err) {
                console.error("Error querying database:", err);
                res.status(500).json({ error: "Internal Server Error" });
                return;
            }
            if (result.length > 0) {
                res.status(400).json({ error: "Application already exists for this fund" });
                return;
            }
            
            req.db.query(
                "INSERT INTO funding_applications SET ?",
                { applicant_id, fund_id, status: "pending", attachments: JSON.stringify(attachments) },
                (err, result) => {
                    if (err) {
                        console.error("Error inserting into database:", err);
                        res.status(500).json({ error: "Internal Server Error" });
                        return;
                    }
                    res.json({ message: "Application submitted successfully" });
                }
            );
        }
    );
})



export default router;