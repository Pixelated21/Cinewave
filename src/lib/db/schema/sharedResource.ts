import { text, pgTable, integer, serial } from "drizzle-orm/pg-core";
import { relations } from "drizzle-orm";
import { resource } from "./resource";
import { sharedList } from "./sharedList";

export const sharedResource = pgTable("shared_resources", {
	id: serial("id").primaryKey(),
	shared_list_id: integer("shared_list_id")
		.notNull()
		.references(() => sharedList.id, { onDelete: "cascade" }),
	resource_id: text("resource_id")
		.notNull()
		.references(() => resource.resource_id, { onDelete: "cascade" }),
});

export const sharedMovieRelations = relations(sharedResource, ({ one }) => ({
	resource: one(resource, {
		fields: [sharedResource.resource_id],
		references: [resource.resource_id],
	}),
	shared_list: one(sharedList, {	
		fields: [sharedResource.shared_list_id],
		references: [sharedList.id],
	}),
}));

export type InsertSharedResource = typeof sharedResource.$inferInsert;
export type SelectSharedResource = typeof sharedResource.$inferSelect;
