import { readConfig } from "src/config";
import { getFeedByUrl } from "../lib/db/queries/feeds";
import { getUser } from "../lib/db/queries/users";
import { createFeedFollow } from "../lib/db/queries/feed_follows";
import { getFeedFollowsForUser } from "../lib/db/queries/feed_follows";

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

export async function handlerFollowing(_: string) {
  const config = readConfig();
  const user = await getUser(config.currentUserName);
  if (!user) {
    throw new Error(`User ${config.currentUserName} not found`);
  }
  
  const feedFollows = await getFeedFollowsForUser(user.id);
  
  if (feedFollows.length === 0) {
    console.log("No feeds found.");
    return;
  }
  
  console.log(`Found %d feeds:\n`, feedFollows.length);
  for (const follow of feedFollows) {
    console.log(`* ${follow.feedName}`);
  }
}