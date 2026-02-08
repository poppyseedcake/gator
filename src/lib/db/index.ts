import { drizzle } from "drizzle-orm/postgres-js";
import postgres from "postgres";

import * as schema from "./schema";
import { readConfig } from "../../config";

const config = readConfig();
console.log("Connecting to DB with URL:", config.dbUrl);
const conn = postgres(config.dbUrl);
console.log("DB connection created");

export const db = drizzle(conn, { schema });