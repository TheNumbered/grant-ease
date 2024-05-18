import express from "express";
import fs from 'fs';
import multer, { diskStorage } from 'multer';
import path from 'path';

const router = express.Router();

const toUnderScoreNotation = (str) => {
    return str.replace(/\s+/g, '_').toLowerCase();
}

// Multer storage configuration
const storage = diskStorage({
    destination: (req, file, cb) => {
        const dir = `uploads/funding_opportunities/${toUnderScoreNotation(req.body.title)}`;
        fs.mkdirSync(dir, { recursive: true });
        cb(null, dir);
    },
    filename: (req, file, cb) => {
        cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname));
    }
}); 

// Multer upload instance
const upload = multer({ storage: storage });

// POST endpoint for creating funding opportunities
router.post("/create-funding-opportunities", upload.single('image'), (req, res) => {
    const id = req.auth.userId;
    const { title, description, amount, deadline, start_date, end_date } = req.body;
    const image = req.file.path;
    req.db.query(
        `
        INSERT INTO funding_opportunities (manager_id, title, description, amount, deadline, start_date, end_date, image)
        VALUES (?, ?, ?, ?, ?, ?, ?, ?);
        `,
        [id, title, description, amount, deadline, start_date, end_date, image],
        (err, result) => {
            if (err) {
                console.error("Error querying database:", err);
                res.status(500).json({ error: "Internal Server Error" });
                return;
            }
            res.json({ message: "Funding opportunity created successfully" });
        }
    );
});

export default router;
