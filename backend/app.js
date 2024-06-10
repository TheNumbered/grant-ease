import cors from "cors";
import dotenv from "dotenv";
import express from "express";
import mysql2 from "mysql2";
import MainRouter from "./routes/index.js";
dotenv.config({ path: ".env.local" });

const dbConfig = process.env.DATABASE_URL || {
  host: process.env.MYSQL_HOST,
  user: process.env.MYSQL_USER,
  password: process.env.MYSQL_PASSWORD,
  database: process.env.MYSQL_DATABASE,
  port: process.env.MYSQL_PORT,
};

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());
app.use(
  "/uploads/funding_opportunities/",
  express.static("uploads/funding_opportunities/")
);
app.use("/uploads/user_documents/", express.static("uploads/user_documents/"));

let dbConnection;

const initializeDbConnection = () => {
  if (!dbConnection) {
    dbConnection = mysql2.createConnection(dbConfig);
    dbConnection.connect((err) => {
      if (err) {
        console.error("Error connecting to MySQL database:", err);
        dbConnection = null;
      } else {
        console.log("Connected to MySQL database");
      }
    });
  }
};

const checkDbConnection = () => new Promise((resolve) => {
  if (!dbConnection) return resolve(false);
  dbConnection.ping((err) => {
    if (err) {
      console.error("MySQL connection lost:", err);
      dbConnection = null;
      resolve(false);
    } else {
      resolve(true);
    }
  });
});

app.use(async (req, res, next) => {
  if (!(await checkDbConnection())) initializeDbConnection();
  if (dbConnection) req.db = dbConnection;
  else return next(new Error("Database error"));
  next();
});

app.use("/", MainRouter);

app.use((err, req, res, next) => {
  if (err.message === "Unauthenticated") res.status(401).json({ error: "Unauthenticated" });
  else if (err.message === "Database error") res.status(500).json({ error: "Database error" });
  else if (err.message === "Missing required parameters") res.status(400).json({ error: "Missing required parameters" });
  else {
    console.error("Error:", err);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

export default app;
