import { pgTable, timestamp, uuid, text, uniqueIndex } from "drizzle-orm/pg-core";

export const users = pgTable("users", {
  id: uuid("id").primaryKey().defaultRandom().notNull(),
  createdAt: timestamp("created_at").notNull().defaultNow(),
  updatedAt: timestamp("updated_at")
    .notNull()
    .defaultNow()
    .$onUpdate(() => new Date()),
  name: text("name").notNull().unique(),
});

export type User = typeof users.$inferSelect; // feeds is the table object in schema.ts

export const feeds = pgTable("feeds", {
  id: uuid("id").primaryKey().defaultRandom().notNull(),
  createdAt: timestamp("created_at").notNull().defaultNow(),
  updatedAt: timestamp("updated_at")
    .notNull()
    .defaultNow()
    .$onUpdate(() => new Date()),
  name: text("name").notNull(),
  url: text("url").notNull().unique(),
  user_id: uuid("user_id").notNull().references(() => users.id, {onDelete: "cascade"}),
  lastFetchedAt: timestamp("last_fetched_at"),
});

export type Feed = typeof feeds.$inferSelect; // feeds is the table object in schema.ts

export const feed_follows = pgTable("feed_follows", {
  id: uuid("id").primaryKey().defaultRandom().notNull(),
  createdAt: timestamp("created_at").notNull().defaultNow(),
  updatedAt: timestamp("updated_at")
    .notNull()
    .defaultNow()
    .$onUpdate(() => new Date()),
  user_id: uuid("user_id").notNull().references(() => users.id, {onDelete: "cascade"}),
  feed_id: uuid("feed_id").notNull().references(() => feeds.id, {onDelete: "cascade"}),
}, (table) => ({
  uniqueUserFeed: uniqueIndex("feed_follows_user_feed_idx").on(
    table.user_id,
    table.feed_id,
  ),
}));

export type FeedFollow = typeof feed_follows.$inferSelect; 
