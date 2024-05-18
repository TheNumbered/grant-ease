import express from "express";
const router = express.Router();

router.get("/meta",  (req, res, next) => {
  const {userId:id, userFullName: full_name} = req.auth.claims;
  if(!id || !full_name) return res.status(400).json({error: "Invalid user"}); 

  req.db.query("SELECT * FROM user WHERE id = ?", [id], (err, result) => {
    if (err) return next(err);

    if (result.length === 0) {
      // First user to sign in becomes an admin
      req.db.query("SELECT COUNT(*) as count FROM user", (err, countResult) => {
        if (err) return next(err);

        const role = countResult[0].count === 0 ? "admin" : "user";
        req.db.query(
          "INSERT INTO user SET ?",
          { id, role, full_name },
          (err, insertResult) => {
            if (err) return next(err);
            res.json({ id, role, is_banned: 0, full_name });
          }
        );
      });
    } else {
      res.json(result[0]);
    }
  });
});

export default router;
