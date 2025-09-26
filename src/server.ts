import app from "./app";
import { pool } from "./db";
import dotenv from "dotenv";
dotenv.config();

const PORT = Number(process.env.PORT || 3000);

async function start() {
  try {
    await pool.query("SELECT 1");
    console.log("DB connected");
  } catch (err) {
    console.error("DB connection failed:", err);
    process.exit(1);
  }

  app.listen(PORT, () => {
    console.log(`Server listening on ${PORT}`);
  });
}

start();