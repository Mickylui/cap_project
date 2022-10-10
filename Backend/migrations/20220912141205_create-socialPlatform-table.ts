import { Knex } from "knex";

export async function up(knex: Knex): Promise<void> {
    await knex.schema.hasTable("posts").then(function (exists) {
        if (!exists) {
            return knex.schema.createTable("posts", function (t) {
                t.increments("id").primary();
                t.string("title");
                t.string("event_date");
                t.string("event_time");
                t.string("event_location");
                t.string("description");
                t.string("contact");
                t.boolean("is_complain");
                t.boolean("is_ordinary");
                t.boolean("is_event");
                t.timestamp("display_push").defaultTo(knex.fn.now());
                t.integer("user_id");
                t.foreign("user_id").references("users.id").onDelete("CASCADE").onUpdate("CASCADE");
                t.timestamp("created_at").defaultTo(knex.fn.now());
                t.timestamp("updated_at").defaultTo(knex.fn.now());
                t.boolean("is_delete").defaultTo(false);
            });
        }
        return;
    });

    await knex.schema.hasTable("tags").then(function (exists) {
        if (!exists) {
            return knex.schema.createTable("tags", function (t) {
                t.increments("id").primary();
                t.string("tag").unique();
            });
        }
        return;
    });

    await knex.schema.hasTable("post_tags").then(function (exists) {
        if (!exists) {
            return knex.schema.createTable("post_tags", function (t) {
                t.increments("id").primary();
                t.integer("post_id");
                t.foreign("post_id").references("posts.id").onDelete("CASCADE").onUpdate("CASCADE");
                t.integer("tag_id");
                t.foreign("tag_id").references("tags.id").onDelete("CASCADE").onUpdate("CASCADE");
            });
        }
        return;
    });
    await knex.schema.hasTable("post_images").then(function (exists) {
        if (!exists) {
            return knex.schema.createTable("post_images", function (t) {
                t.increments("id").primary();
                t.text("image");
                t.integer("post_id");
                t.foreign("post_id").references("posts.id").onDelete("CASCADE").onUpdate("CASCADE");
            });
        }
        return;
    });
    await knex.schema.hasTable("post_views").then(function (exists) {
        if (!exists) {
            return knex.schema.createTable("post_views", function (t) {
                t.increments("id").primary();
                t.integer("view_by_user_id");
                t.foreign("view_by_user_id")
                    .references("users.id")
                    .onDelete("CASCADE")
                    .onUpdate("CASCADE");
                t.integer("post_id");
                t.foreign("post_id").references("posts.id").onDelete("CASCADE").onUpdate("CASCADE");
                t.timestamp("view_begin").defaultTo(knex.fn.now());
                t.timestamp("view_end").defaultTo(knex.fn.now());
            });
        }
        return;
    });
    await knex.schema.hasTable("post_likes").then(function (exists) {
        if (!exists) {
            return knex.schema.createTable("post_likes", function (t) {
                t.increments("id").primary();
                t.integer("like_by_user_id");
                t.foreign("like_by_user_id")
                    .references("users.id")
                    .onDelete("CASCADE")
                    .onUpdate("CASCADE");
                t.integer("post_id");
                t.foreign("post_id").references("posts.id").onDelete("CASCADE").onUpdate("CASCADE");
                t.timestamp("like_at").defaultTo(knex.fn.now());
                t.boolean("is_dislike").defaultTo(false);
            });
        }
        return;
    });

    await knex.schema.hasTable("complaints").then(function (exists) {
        if (!exists) {
            return knex.schema.createTable("complaints", function (t) {
                t.increments("id").primary();
                t.string("reason");
                t.text("description");
                t.integer("complainant_id");
                t.foreign("complainant_id")
                    .references("users.id")
                    .onDelete("CASCADE")
                    .onUpdate("CASCADE");
                t.integer("complainee_id");
                t.foreign("complainee_id")
                    .references("users.id")
                    .onDelete("CASCADE")
                    .onUpdate("CASCADE");
                t.integer("post_id");
                t.foreign("post_id").references("posts.id").onDelete("CASCADE").onUpdate("CASCADE");
                t.timestamp("complained_at").defaultTo(knex.fn.now());
                t.timestamp("solved_at").defaultTo(knex.fn.now());
            });
        }
        return;
    });
}

export async function down(knex: Knex): Promise<void> {
    await knex.schema.dropTableIfExists("complaints");
    await knex.schema.dropTableIfExists("post_likes");
    await knex.schema.dropTableIfExists("post_views");
    await knex.schema.dropTableIfExists("post_images");
    await knex.schema.dropTableIfExists("post_tags");
    await knex.schema.dropTableIfExists("tags");
    await knex.schema.dropTableIfExists("posts");
}
