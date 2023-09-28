import { text, pgTable, varchar, serial } from "drizzle-orm/pg-core";
import { relations } from "drizzle-orm";
import { user } from "./user";
import { sharedResource } from "./sharedResource";

export const sharedList = pgTable("shared_lists", {
	id: serial("id").primaryKey(),
	title: varchar("title", { length: 256 }).notNull(),
	link: text("link").notNull().unique(),
	user_id: text("user_id")
		.notNull()
		.references(() => user.id, { onDelete: "cascade" }),
});

export const sharedLinkRelations = relations(sharedList, ({ one, many }) => ({
	shared_resources: many(sharedResource),
	user: one(user, {
		fields: [sharedList.user_id],
		references: [user.id],
	}),
}));

export type InsertSharedLink = typeof sharedList.$inferInsert;
export type SelectSharedLink = typeof sharedList.$inferSelect;
