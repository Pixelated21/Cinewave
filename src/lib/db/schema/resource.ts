import { text, pgTable, varchar, integer, serial } from "drizzle-orm/pg-core";
import {
	type InferSelectModel,
	type InferInsertModel,
	relations,
} from "drizzle-orm";
import { bookmark } from "./bookmark";
import { sharedResource } from "./sharedResource";

export const resource = pgTable("resources", {
	id: serial("id").primaryKey(),
	resource_id: text("resource_id").unique().notNull(),
	poster_path: text("poster"),
	title: varchar("title", { length: 256 }).notNull(),
	release_date: integer("year").notNull(),
	resource_type: varchar("type", { enum: ["movie", "series"] }),
});

export const resourceRelations = relations(resource, ({ many }) => ({
	sharedResource: many(sharedResource),
	bookmarks: many(bookmark),
}));

export type SelectResource = InferSelectModel<typeof resource>;
export type InsertResource = InferInsertModel<typeof resource>;
