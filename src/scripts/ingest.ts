import fs from "fs";
import path from "path";
import dotenv from "dotenv";
dotenv.config();
import { storeDocument } from "../services/rag";

async function ingestFolder(folder: string) {
  const files = fs.readdirSync(folder);
  for (const f of files) {
    const full = path.join(folder, f);
    if (fs.lstatSync(full).isFile()) {
      const content = fs.readFileSync(full, "utf-8");
      console.log("Ingesting", f);
      await storeDocument(f, content, { source: "local", filename: f });
      await new Promise((r) => setTimeout(r, 200));
    }
  }
}

const folder = process.argv[2] || "./data/letters";
ingestFolder(folder).then(() => {
  console.log("Done");
  process.exit(0);
}).catch(err => {
  console.error(err);
  process.exit(1);
});