import { pgTable, serial, varchar, integer } from "drizzle-orm/pg-core";

export const shows = pgTable("shows", {
  id: serial("id").primaryKey(),
  showId: integer("showId").notNull(),
  order: integer("order").default(0).notNull(),
  name: varchar("name", { length: 255 }).notNull(),
  image: varchar("image", { length: 1024 }).notNull(),
});

export type Show = typeof shows.$inferSelect;

export const votes = pgTable("votes", {
  id: serial("id").primaryKey(),
  userId: varchar("userId", { length: 255 }).notNull(),
  showId: integer("showId").notNull(),
  order: integer("order").notNull(),
});

export type Vote = typeof votes.$inferSelect;
