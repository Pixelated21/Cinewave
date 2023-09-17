CREATE TABLE IF NOT EXISTS "watchlist" (
	"id" serial PRIMARY KEY NOT NULL,
	"user_id" varchar,
	"movie_id" varchar,
	"poster" text,
	"title" varchar(256),
	"year" integer,
	"type" varchar(256)
);
