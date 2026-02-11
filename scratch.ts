import postgres from "postgres";

const sql = postgres("postgres://postgres:postgres@127.0.0.1:5432/gator", {
  ssl: false,
});

const res = await sql`select 1 as ok`;
console.log(res);

await sql.end({ timeout: 5 });