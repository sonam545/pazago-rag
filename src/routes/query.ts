import express from "express";
import { search } from "../services/rag";
import OpenAI from "openai";
import dotenv from "dotenv";
dotenv.config();

const router = express.Router();
const client = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

router.post("/", async (req, res) => {
  try {
    const q = req.body.q || req.query.q;
    const k = Number(req.body.k ?? req.query.k ?? 4);
    if (!q) return res.status(400).json({ error: "q required" });

    const docs = await search(q, k);

    const context = docs
      .map(
        (d: any, i: number) => `DOC_${i + 1} TITLE: ${d.title}
${d.content}`
      )
      .join("\n\n---\n\n");

    const prompt = `Use the following documents to answer the question. If answer is not present, say "I don't know from the provided documents".
Question: ${q}

Documents:
${context}

Answer concisely:`;

    const model = process.env.LLM_MODEL || "gpt-4o-mini";
    const completion = await client.chat.completions.create({
      model,
      messages: [{ role: "user", content: prompt }],
      max_tokens: 512,
    });

    const answer = completion.choices?.[0]?.message?.content ?? "";

    res.json({ docs, answer });
  } catch (err) {
    console.error("Error in /query route:", err);
    res.status(500).json({ error: err.message || "internal" });
  }
});

export default router;