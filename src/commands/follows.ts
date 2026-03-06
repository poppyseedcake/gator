import { readConfig } from "src/config";
import { getFeedByUrl } from "../lib/db/queries/feeds";
import { getUser } from "../lib/db/queries/users";
import { createFeedFollow } from "../lib/db/queries/feed_follows";
import { getFeedFollowsForUser } from "../lib/db/queries/feed_follows";
import { User } from "src/lib/db/schema";

export async function handlerFollow(cmdName: string, user: User, ...args: string[]) {
  if (args.length !== 1) {
    throw new Error(`usage: ${cmdName} <url>`);
  }
  const url = args[0];
  const feed = await getFeedByUrl(url);
  if (!feed) {
    throw new Error(`Feed not found for URL: ${url}`);
  }
  const feedFollow = await createFeedFollow(feed.id, user.id);
  
  console.log(`Feed followed successfully!`);
  console.log(`* Feed: ${feedFollow.feedName}`);
  console.log(`* User: ${feedFollow.userName}`);
}

export async function handlerFollowing(_: string, user: User) {
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