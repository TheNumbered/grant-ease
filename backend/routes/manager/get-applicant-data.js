import { ClerkExpressRequireAuth } from "@clerk/clerk-sdk-node";
import express from "express";
import { db } from "../../db/index.js";

const router = express.Router();

router.get(
  "/bursary-applications-data",
  ClerkExpressRequireAuth(),
  (req, res) => {
    db.query("SELECT * FROM applications", (err, result) => {
      if (err) {
        console.error("Error querying database:", err);
        res.status(500).json({ error: "Internal Server Error" });
        return;
      }
      res.json(result);
    });
  }
);

router.get(
  "/event-applications-data",
  ClerkExpressRequireAuth(),
  (req, res) => {
    db.query("SELECT * FROM event_applications", (err, result) => {
      if (err) {
        console.error("Error querying database:", err);
        res.status(500).json({ error: "Internal Server Error" });
        return;
      }
      res.json(result);
    });
  }
);
router.get(
  "/business-applications-data",
  ClerkExpressRequireAuth(),
  (req, res) => {
    db.query("SELECT * FROM business_applications", (err, result) => {
      if (err) {
        console.error("Error querying database:", err);
        res.status(500).json({ error: "Internal Server Error" });
        return;
      }
      res.json(result);
    });
  }
);

export default router;
