CREATE TYPE "public"."education" AS ENUM('none', 'high school', 'undergraduate', 'masters', 'phd');--> statement-breakpoint
CREATE TYPE "public"."gender" AS ENUM('male', 'female', 'other');--> statement-breakpoint
CREATE TYPE "public"."marital_status" AS ENUM('single', 'married', 'divorced');--> statement-breakpoint
CREATE TABLE "applicants" (
	"id" integer PRIMARY KEY NOT NULL,
	"biography" text,
	"date_of_birth" date,
	"nationality" varchar(100),
	"marital_status" "marital_status",
	"gender" "gender",
	"education" "education",
	"experience" text,
	"website_url" varchar(255),
	"location" varchar(255),
	"deleted_at" timestamp,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
ALTER TABLE "applicants" ADD CONSTRAINT "applicants_id_user_id_fk" FOREIGN KEY ("id") REFERENCES "public"."user"("id") ON DELETE cascade ON UPDATE no action;