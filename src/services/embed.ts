import dotenv from "dotenv";
dotenv.config();
import OpenAI from "openai";

const client = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

export async function embedText(text: string) {
  const model = process.env.EMBED_MODEL || "text-embedding-3-small";
  const resp = await client.embeddings.create({
    model,
    input: text
  });
  return resp.data[0].embedding;
}