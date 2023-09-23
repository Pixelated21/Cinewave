import { text, pgTable, integer, serial } from "drizzle-orm/pg-core";
import { relations } from "drizzle-orm";
import { user } from "./user";
import { resource } from "./resource";

export const bookmark = pgTable("bookmarks", {
	id: serial("id").primaryKey(),
	user_id: text("user_id")
		.notNull()
		.references(() => user.id),
	resource_id: text("resource_id")
		.notNull()
		.references(() => resource.resource_id),
});

export const bookmarkRelations = relations(bookmark, ({ one }) => ({
	resource: one(resource, {
		fields: [bookmark.resource_id],
		references: [resource.resource_id],
	}),
	user: one(user, {
		fields: [bookmark.user_id],
		references: [user.id],
	}),
}));

export type InsertBookmark = typeof bookmark.$inferInsert;
export type SelectBookmark = typeof bookmark.$inferSelect;
