import { drizzle } from "drizzle-orm/postgres-js";
import postgres from "postgres";

import * as schema from "./schema";
import { readConfig } from "../../config";

const config = readConfig();
console.log("Connecting to DB with URL:", config.dbUrl);
//export const conn = postgres(config.dbUrl);
const conn = postgres(config.dbUrl, { ssl: false });
export { conn };
conn`select 1 as ok`
  .then((r) => console.log("postgres-js smoke test ok:", r))
  .catch((e) => console.error("postgres-js smoke test failed:", e));
console.log("DB connection created");
export const db = drizzle(conn, { schema });
