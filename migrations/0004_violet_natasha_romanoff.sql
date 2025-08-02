CREATE TABLE "order" (
	"id" text PRIMARY KEY NOT NULL,
	"customer_name" text NOT NULL,
	"customer_email" text NOT NULL,
	"customer_address" text NOT NULL,
	"total_amount" integer NOT NULL,
	"stripe_payment_intent_id" text,
	"status" text DEFAULT 'new' NOT NULL,
	"created_at" timestamp NOT NULL,
	"updated_at" timestamp NOT NULL
);
--> statement-breakpoint
CREATE TABLE "order_item" (
	"id" text PRIMARY KEY NOT NULL,
	"order_id" text NOT NULL,
	"artwork_id" text NOT NULL,
	"quantity" integer DEFAULT 1 NOT NULL,
	"price_at_time" integer NOT NULL,
	"created_at" timestamp NOT NULL
);
--> statement-breakpoint
ALTER TABLE "order_item" ADD CONSTRAINT "order_item_order_id_order_id_fk" FOREIGN KEY ("order_id") REFERENCES "public"."order"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "order_item" ADD CONSTRAINT "order_item_artwork_id_artwork_id_fk" FOREIGN KEY ("artwork_id") REFERENCES "public"."artwork"("id") ON DELETE no action ON UPDATE no action;