import express from "express";
import dotenv from "dotenv";
dotenv.config();
import docsRouter from "./routes/docs";
import queryRouter from "./routes/query";

const app = express();
app.use(express.json({ limit: "5mb" }));

app.get("/", (req, res) => res.send("Pazago RAG server"));

app.use("/docs", docsRouter);
app.use("/query", queryRouter);

export default app;