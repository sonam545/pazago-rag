# Pazago RAG — Assignment scaffold

## Requirements
- Node.js (18+)
- Docker (for Postgres + pgvector)
- OpenAI API key

## Steps
1. Copy `.env.example` to `.env` and set your values.
2. Start DB:
   ```sh
   docker compose up -d
   ```
   Then run the SQL in `sql/init.sql`.
3. Install dependencies:
   ```sh
   npm install
   ```
4. Start dev server:
   ```sh
   npm run dev
   ```
5. Ingest documents:
   ```sh
   npm run ingest -- ./data/letters
   ```
6. Query API:
   ```sh
   POST http://localhost:3000/query
   { "q": "Example question" }
   ```
7. OpenAPI spec available in `openapi.yaml`.
