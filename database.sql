
-- USER is a reserved keyword with Postgres
-- You must use double quotes in every query that user is in:
-- ex. SELECT * FROM "user";
-- Otherwise you will have errors!
CREATE TABLE "user" (
    "id" SERIAL PRIMARY KEY,
    "username" VARCHAR (80) UNIQUE NOT NULL,
    "password" VARCHAR (1000) NOT NULL
);

CREATE TABLE "message" (
	"id" SERIAL PRIMARY KEY,
	"user_id" INT REFERENCES "user",
	"parent_id" INT REFERENCES "message",
	"created_at" TIMESTAMP NOT NULL DEFAULT NOW(),
	"content" VARCHAR (1000),
	"deleted" BOOLEAN,
	"edited" BOOLEAN,
	"reaction" INT NOT NULL DEFAULT 0
);

CREATE TABLE "user_message" (
	"user_id" INT REFERENCES "user",
	"message_id" INT REFERENCES "message",
	"reaction" INT NOT NULL
);

INSERT INTO "message" ("user_id", "content")
VALUES (1, 'hello Tu');
