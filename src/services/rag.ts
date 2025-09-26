import { query } from "../db";
import { embedText } from "./embed";

export async function storeDocument(title: string, content: string, metadata: any = {}) {
  const embedding = await embedText(content);
  const sql = `INSERT INTO documents (title, content, metadata, embedding) VALUES ($1, $2, $3, $4) RETURNING id;`;
  const res = await query(sql, [title, content, metadata, embedding]);
  return res.rows[0];
}

export async function search(queryText: string, k = 5) {
  const queryEmbedding = await embedText(queryText);
  const sql = `
    SELECT id, title, content, metadata, embedding, (embedding <#> $1) AS distance
    FROM documents
    ORDER BY embedding <#> $1
    LIMIT $2;
  `;
  const res = await query(sql, [queryEmbedding, k]);
  return res.rows;
}