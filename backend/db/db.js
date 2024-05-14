import dotenv from "dotenv";
import mysql2 from "mysql2";
dotenv.config({ path: ".env.local" });

// MySQL database configuration
let dbConfig;

if (process.env.DATABASE_URL) {
  dbConfig = process.env.DATABASE_URL;
} else {
  dbConfig = {
    host: process.env.MYSQL_HOST,
    user: process.env.MYSQL_USER,
    password: process.env.MYSQL_PASSWORD,
    database: process.env.MYSQL_DATABASE,
    port: process.env.MYSQL_PORT,
  };
}

export const db = mysql2.createConnection(dbConfig);
// Connect to MySQL database
db.connect((err) => {
  if (err) {
    console.error("Error connecting to MySQL database:", err);
    return;
  }
  console.log("Connected to MySQL database");
});
