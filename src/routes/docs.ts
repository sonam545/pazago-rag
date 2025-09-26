import express from "express";
import { storeDocument } from "../services/rag";

const router = express.Router();

router.post("/", async (req, res) => {
  try {
    const { title, content, metadata } = req.body;
    if (!content) return res.status(400).json({ error: "content required" });
    const row = await storeDocument(title || "untitled", content, metadata || {});
    res.json({ id: row.id });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "internal" });
  }
});

export default router;