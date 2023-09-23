import { relations } from "drizzle-orm";
import { pgTable, text, timestamp } from "drizzle-orm/pg-core";
import { bookmark } from "./bookmark";
import { sharedList } from "./sharedList";

export const user = pgTable("user", {
	id: text("id").notNull().primaryKey(),
	name: text("name"),
	email: text("email").notNull(),
	emailVerified: timestamp("emailVerified", { mode: "date" }),
	image: text("image"),
});

export const userRelations = relations(user, ({ many }) => ({
	sharedLists: many(sharedList),
	bookmarks: many(bookmark),
}));
