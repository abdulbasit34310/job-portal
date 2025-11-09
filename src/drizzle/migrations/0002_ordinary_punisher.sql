CREATE TABLE "employers" (
	"id" integer PRIMARY KEY NOT NULL,
	"name" varchar(255),
	"description" text,
	"avatar_url" text,
	"banner_image_url" text,
	"organization_type" varchar(100),
	"team_size" varchar(50),
	"year_of_establishment" integer,
	"website_url" varchar(255),
	"location" varchar(255),
	"deleted_at" timestamp,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
ALTER TABLE "employers" ADD CONSTRAINT "employers_id_user_id_fk" FOREIGN KEY ("id") REFERENCES "public"."user"("id") ON DELETE cascade ON UPDATE no action;