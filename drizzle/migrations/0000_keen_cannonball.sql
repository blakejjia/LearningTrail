CREATE TABLE "users" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"short_id" varchar(255) NOT NULL,
	"data" jsonb NOT NULL
);
