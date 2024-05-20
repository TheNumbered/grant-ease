import cors from "cors";
import dotenv from "dotenv";
import express from "express";
import { db } from "./db/index.js";
import MainRouter from "./routes/index.js";
dotenv.config({ path: ".env.local" });

const app = express();

// Middleware for parsing JSON and urlencoded data
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

// Serving images
app.use(
  "/uploads/funding_opportunities/",
  express.static("uploads/funding_opportunities/")
);
app.use("/uploads/user_documents/", express.static("uploads/user_documents/"));

// Attach the database to the request object
app.use((req, res, next) => {
  req.db = db;
  next();
});

// Routes
app.use("/", MainRouter);

// Error handling middleware
app.use((err, req, res, next) => {
  if (err.message === "Unauthenticated") {
    res.status(401).json({ error: "Unauthenticated" });
  } else if (err.message === "Database error") {
    res.status(500).json({ error: "Database error" });
  } else if (err.message === "Missing required parameters") {
    res.status(400).json({ error: "Missing required parameters" });
  } else {
    console.error("Error:", err);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

export default app;
