import express from "express";
const router = express.Router();


router.get("/users",  (req, res, next) => {
    req.db.query("SELECT * FROM user;", (err, result) => {
        if (err) return next(err);
        res.json(result);
    });
});

router.get("/pending-managers",  (req, res, next) => {
    req.db.query("SELECT * FROM user WHERE role = 'fund_manager_pending'; ", (err, result) => {
        if (err) return next(err);
        res.json(result);
    });
});

router.put("/toggle-ban/:id",  (req, res, next) => {
    req.db.query("UPDATE user SET is_banned = ? WHERE id = ?", [req.body.is_banned, req.params.id], (err, result) => {
        if (err) return next(err);
        res.json({ message: "User banned status updated successfully" });
    });
});

router.post("/update-roles",   (req, res, next) => {
    const { ids, newRole } = req.body;

    if (!ids || !newRole) return next(new Error("Missing required parameters"));

    req.db.query("UPDATE user SET role = ? WHERE id IN (?)", [newRole, ids], (err, result) => {
        if (err) return next(err);
        if(newRole === 'fund_manager'){
            ids.forEach(id => {
                req.db.query("INSERT INTO fund_manager_info (manager_id) VALUES (?)", [id], (err, result) => {
                    if (err) return next(err);
                });
            });
        }
        res.json({ message: "Roles updated successfully" });
    });
});


export default router;