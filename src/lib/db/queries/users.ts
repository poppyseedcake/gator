import { db } from "..";
import { users } from "../schema";
import { eq } from 'drizzle-orm'; 

export async function createUser(name: string) {
    const [result] = await db.insert(users).values({ name: name }).returning();
    return result;
}

export async function getUser(name: string) {
    console.log("getUser start:", name);
    const [result] = await db.select().from(users).where(eq(users.name, name));
    console.log("getUser query done");
    return result;
}
//