import { db } from "..";
import { feed_follows, feeds, users } from "../schema";
import { eq } from "drizzle-orm";

export async function createFeedFollow(feedId: string, userId: string) {
  const [newFeedFollow] = await db.insert(feed_follows).values({
    feed_id: feedId,
    user_id: userId,
  }).returning();

  const result = await db.select({
    id: feed_follows.id,
    createdAt: feed_follows.createdAt,
    updatedAt: feed_follows.updatedAt,
    userId: feed_follows.user_id,
    feedId: feed_follows.feed_id,
    userName: users.name,
    feedName: feeds.name,
  })
  .from(feed_follows)
  .innerJoin(feeds, eq(feed_follows.feed_id, feeds.id))
  .innerJoin(users, eq(feed_follows.user_id, users.id))
  .where(eq(feed_follows.id, newFeedFollow.id));

  return result[0];
}