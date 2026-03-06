// Add a follow command. It takes a single url argument and creates a new feed follow record for the current user. 
// It should print the name of the feed and the current user once the record is created (which the query we just made should support). 
// You'll need a query to look up feeds by URL.

import { readConfig } from "src/config";
import { getFeedByUrl } from "../lib/db/queries/feeds";
import { getUser } from "../lib/db/queries/users";
import { createFeedFollow } from "../lib/db/queries/feed_follows";

export async function handlerFollow(cmdName: string, ...args: string[]) {
  if (args.length !== 1) {
    throw new Error(`usage: ${cmdName} <url>`);
  }
  const url = args[0];
  const config = readConfig();
  const user = await getUser(config.currentUserName);
  if (!user) {
    throw new Error(`User ${config.currentUserName} not found`);
  }
  const feed = await getFeedByUrl(url);
  if (!feed) {
    throw new Error(`Feed not found for URL: ${url}`);
  }
  const feedFollow = await createFeedFollow(feed.id, user.id);
  
  console.log(`Feed followed successfully!`);
  console.log(`* Feed: ${feedFollow.feedName}`);
  console.log(`* User: ${feedFollow.userName}`);
}