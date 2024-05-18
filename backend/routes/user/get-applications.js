import express from "express";
const router = express.Router();

// Route to get applications from the database for the current user by id
router.get("/applications", (req, res) => {
    const id = req.auth.userId;
    // const id = "user2";
    req.db.query("SELECT fa.*, fo.title FROM funding_applications fa JOIN funding_opportunities fo ON fa.fund_id = fo.id WHERE fa.applicant_id = ?", [id], (err, result) => {
        if (err) {
            console.error("Error querying database:", err);
            res.status(500).json({ error: "Internal Server Error" });
            return;
        }
        res.json(result);
    });
});

export default router;