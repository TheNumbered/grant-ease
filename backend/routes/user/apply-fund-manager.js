import express from "express";

const router = express.Router();

router.post("/apply-fund-manager", (req, res, next) => {
    const id = req.auth.userId;
    
    req.db.query("SELECT role FROM user WHERE id = ?", [id], (err, results) => {
        if (err) {
            return next(err);
        }
        
        if (results.length === 0) {
            return res.status(404).json({ message: "User not found" });
        }

        const currentRole = results[0].role;
        
        if (currentRole === "fund_manager") {
            return res.status(400).json({ message: "User is already a fund manager" });
        }
        else if (currentRole === "fund_manager_pending") {
            return res.status(400).json({ message: "User has already applied to be a fund manager" });
        }
        else if (currentRole === "admin") {
            req.db.query("INSERT INTO fund_manager_info (manager_id) VALUES (?)", [id], (err, result) => {
                if (err) {
                    return next(err);
                }
                res.json({ message: "You are now a fund manager" });
            });
        }
        else if(currentRole === "user"){
            req.db.query("UPDATE user SET role = 'fund_manager_pending' WHERE id = ?", [id], (err, result) => {
                if (err) {
                    return next(err);
                }
                res.json({ message: "Application submitted" });
            });
        }
    });
   
});

export default router;