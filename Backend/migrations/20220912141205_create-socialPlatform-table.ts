import { Knex } from "knex";


export async function up(knex: Knex): Promise<void> {
    await knex.schema.hasTable('posts').then(function(exists){
        if(!exists){
            return knex.schema.createTable('posts',function(t){
                t.increments('id').primary();
                t.string('title').notNullable();
                t.string('event_date');
                t.string('event_time');
                t.string('event_location');
                t.string('description');
                t.string('contact');
                t.boolean('is_complain').notNullable();
                t.boolean('is_ordinary').notNullable();
                t.boolean('is_third_party').notNullable();
                t.boolean('is_event').notNullable();
                t.integer('user_id').notNullable();
                t.foreign('user_id').references('users.id').onDelete('CASCADE').onUpdate('CASCADE');
                t.timestamp('created_at').defaultTo(knex.fn.now()).notNullable();
                t.timestamp('updated_at').defaultTo(knex.fn.now()).notNullable();
            })
        }
        return;
    })

    await knex.schema.hasTable('tags').then(function(exists){
        if(!exists){
            return knex.schema.createTable('tags',function(t){
                t.increments('id').primary();
                t.string('tag').notNullable().unique();
            })
        }
        return;
    })

    await knex.schema.hasTable('post_tags').then(function(exists){
        if(!exists){
            return knex.schema.createTable('post_tags',function(t){
                t.increments('id').primary();
                t.integer('post_id').notNullable();
                t.foreign('post_id').references('posts.id').onDelete('CASCADE').onUpdate('CASCADE');
                t.integer('tag_id').notNullable();
                t.foreign('tag_id').references('tags.id').onDelete('CASCADE').onUpdate('CASCADE');
            })
        }
        return;
    })
    await knex.schema.hasTable('post_images').then(function(exists){
        if(!exists){
            return knex.schema.createTable('post_images',function(t){
                t.increments('id').primary();
                t.text('image').notNullable();
                t.integer('product_id').notNullable();
                t.foreign('product_id').references('products.id').onDelete('CASCADE').onUpdate('CASCADE');
            })
        }
        return;
    })
    await knex.schema.hasTable('post_views').then(function(exists){
        if(!exists){
            return knex.schema.createTable('post_views',function(t){
                t.increments('id').primary();
                t.timestamp('view_begin').notNullable();
                t.timestamp('view_end').notNullable();
                t.integer('user_id').notNullable();
                t.foreign('user_id').references('users.id').onDelete('CASCADE').onUpdate('CASCADE');
                t.integer('post_id').notNullable();
                t.foreign('post_id').references('posts.id').onDelete('CASCADE').onUpdate('CASCADE');
            })
        }
        return;
    })
    await knex.schema.hasTable('post_likes').then(function(exists){
        if(!exists){
            return knex.schema.createTable('post_likes',function(t){
                t.increments('id').primary();
                t.integer('user_id').notNullable();
                t.foreign('user_id').references('users.id').onDelete('CASCADE').onUpdate('CASCADE');
                t.integer('post_id').notNullable();
                t.foreign('post_id').references('posts.id').onDelete('CASCADE').onUpdate('CASCADE');
            })
        }
        return;
    })
    await knex.schema.hasTable('complaints').then(function(exists){
        if(!exists){
            return knex.schema.createTable('complaints',function(t){
                t.increments('id').primary();
                t.string('reason').notNullable();
                t.text('description');
                t.integer('complainant_id').notNullable();
                t.foreign('complainant_id').references('users.id').onDelete('CASCADE').onUpdate('CASCADE');
                t.integer('complainee_id').notNullable();
                t.foreign('complainee_id').references('users.id').onDelete('CASCADE').onUpdate('CASCADE');
                t.integer('post_id').notNullable();
                t.foreign('post_id').references('posts.id').onDelete('CASCADE').onUpdate('CASCADE');
                t.timestamp('complained_at').defaultTo(knex.fn.now()).notNullable();
                t.timestamp('solved_at');
            })
        }
        return;
    })
}


export async function down(knex: Knex): Promise<void> {
    await knex.schema.dropTableIfExists('complaints');
    await knex.schema.dropTableIfExists('post_likes');
    await knex.schema.dropTableIfExists('post_views');
    await knex.schema.dropTableIfExists('post_images');
    await knex.schema.dropTableIfExists('post_tags');
    await knex.schema.dropTableIfExists('tags');
    await knex.schema.dropTableIfExists('posts');
}

