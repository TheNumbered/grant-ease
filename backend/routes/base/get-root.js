import { ClerkExpressRequireAuth } from "@clerk/clerk-sdk-node";
import express from "express";
const router = express.Router();

router.get("/", ClerkExpressRequireAuth(), (req, res) => {
    res.json({ message: "Welcome, you're authenticated!" });
});

export default router;