import {
	text,
	pgTable,
	varchar,
	integer,
	bigint,
	serial,
} from "drizzle-orm/pg-core";
import { type InferSelectModel, type InferInsertModel } from "drizzle-orm";

// TODO: Abstract movie into separate table and use foreign key to reference it here instead to allow for multiple users to reference the same movie without duplicating data

export const watchlist = pgTable("watchlist", {
	id: serial("id").primaryKey(),
	user_id: varchar("user_id"),
	resource_id: varchar("movie_id"),
	poster_path: text("poster"),
	title: varchar("title", { length: 256 }),
	release_date: integer("year"),
	resource_type: varchar("type", { length: 256 }),
});

export type SelectWatchlist = InferSelectModel<typeof watchlist>;
export type InsertWatchlist = InferInsertModel<typeof watchlist>;
