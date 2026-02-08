import { defineConfig } from "drizzle-kit";
import { readConfig } from "src/config";


const config = readConfig();
const url = config.dbUrl;

export default defineConfig({
  schema: "src/lib/db/schema.ts",
  out: "src/lib/db/",
  dialect: "postgresql",
  dbCredentials: {
    url: url,
  },
});