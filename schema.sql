CREATE TABLE "article_categories" (
  "article_id" int4 NOT NULL,
  "category_id" int4 NOT NULL,
  PRIMARY KEY ("category_id", "article_id")
);

CREATE TABLE "articles" (
  "id" int4 NOT NULL GENERATED ALWAYS AS IDENTITY,
  "title" varchar(255) NOT NULL,
  "announce" text NOT NULL,
  "fulltext" text NOT NULL,
  "picture" varchar(50),
  "user_id" int4 NOT NULL,
  "created_at" timestamp DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY ("id")
);
CREATE INDEX ON "articles" (
  "title"
);

CREATE TABLE "categories" (
  "id" int4 NOT NULL GENERATED ALWAYS AS IDENTITY,
  "name" varchar(255) NOT NULL,
  PRIMARY KEY ("id")
);

CREATE TABLE "comments" (
  "id" int4 NOT NULL GENERATED ALWAYS AS IDENTITY,
  "article_id" int4 NOT NULL,
  "user_id" int4 NOT NULL,
  "text" text NOT NULL,
  "created_at" timestamp DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY ("id")
);

CREATE TABLE "users" (
  "id" int4 NOT NULL GENERATED ALWAYS AS IDENTITY,
  "email" varchar(255) NOT NULL,
  "password_hash" varchar(255) NOT NULL,
  "first_name" varchar(255) NOT NULL,
  "last_name" varchar(255) NOT NULL,
  "avatar" varchar(50) NOT NULL,
  PRIMARY KEY ("id"),
  UNIQUE ("email")
);

ALTER TABLE "article_categories" ADD CONSTRAINT "fk_article_categories_articles_1" FOREIGN KEY ("article_id") REFERENCES "articles" ("id");
ALTER TABLE "article_categories" ADD CONSTRAINT "fk_article_categories_categories_1" FOREIGN KEY ("category_id") REFERENCES "categories" ("id");
ALTER TABLE "articles" ADD CONSTRAINT "fk_articles_users_1" FOREIGN KEY ("user_id") REFERENCES "users" ("id");
ALTER TABLE "comments" ADD CONSTRAINT "fk_comments_articles_1" FOREIGN KEY ("article_id") REFERENCES "articles" ("id");
ALTER TABLE "comments" ADD CONSTRAINT "fk_comments_users_1" FOREIGN KEY ("user_id") REFERENCES "users" ("id");

