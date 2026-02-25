import { readConfig } from "src/config";
import { createFeed } from "src/lib/db/queries/feeds";
import { getUser } from "src/lib/db/queries/users";

export async function addfeed(cmdName: string, ...args: string[]) {
  if (args.length !== 2) {
    throw new Error(`usage: ${cmdName} <name> <url>`);
  }

  const nameFeed = args[0];
  const url = args[1];
  const config = readConfig();
  const currentUserName = config.currentUserName;

  const dbUser = await getUser(currentUserName);
  if (!dbUser) {
    throw new Error(`User ${currentUserName} not found`);
  }

  createFeed(nameFeed, url, dbUser.id);

}