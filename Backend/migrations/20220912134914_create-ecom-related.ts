import { Knex } from "knex";


export async function up(knex: Knex): Promise<void> {
    await knex.schema.hasTable('products').then(function(exists){
        if(!exists){
            return knex.schema.createTable('products',function(t){
                t.increments('id').primary();
                t.string('name').unique().notNullable();
                t.string('description').notNullable();
                t.integer('unit_price').notNullable();
                t.integer('quantity').notNullable();
                t.timestamp('created_at').defaultTo(knex.fn.now()).notNullable();
                t.timestamp('updated_at').defaultTo(knex.fn.now()).notNullable();
            })
        }
        return;
    })

    await knex.schema.hasTable('product_images').then(function(exists){
        if(!exists){
            return knex.schema.createTable('product_images',function(t){
                t.increments('id').primary();
                t.text('image').notNullable();
                t.integer('product_id').notNullable();
                t.foreign('product_id').references('products.id').onDelete('CASCADE').onUpdate('CASCADE');
            })
        }
        return;
    })

    await knex.schema.hasTable('product_sizes').then(function(exists){
        if(!exists){
            return knex.schema.createTable('product_sizes',function(t){
                t.increments('id').primary();
                t.integer('size').notNullable();
                t.integer('product_id').notNullable();
                t.foreign('product_id').references('products.id').onDelete('CASCADE').onUpdate('CASCADE');
            })
        }
        return;
    })
    await knex.schema.hasTable('product_likes').then(function(exists){
        if(!exists){
            return knex.schema.createTable('product_likes',function(t){
                t.increments('id').primary();
                t.integer('user_id').notNullable();
                t.foreign('user_id').references('users.id').onDelete('CASCADE').onUpdate('CASCADE');
                t.integer('product_id').notNullable();
                t.foreign('product_id').references('products.id').onDelete('CASCADE').onUpdate('CASCADE');
                t.timestamp('like_at').defaultTo(knex.fn.now()).notNullable();
            })
        }
        return;
    })
    await knex.schema.hasTable('product_views').then(function(exists){
        if(!exists){
            return knex.schema.createTable('product_views',function(t){
                t.increments('id').primary();
                t.timestamp('view_begin').notNullable();
                t.timestamp('view_end').notNullable();
                t.integer('user_id').notNullable();
                t.foreign('user_id').references('users.id').onDelete('CASCADE').onUpdate('CASCADE');
            })
        }
        return;
    })
    await knex.schema.hasTable('shopping_carts').then(function(exists){
        if(!exists){
            return knex.schema.createTable('shopping_carts',function(t){
                t.increments('id').primary();
                t.integer('quantity').notNullable();
                t.integer('user_id').notNullable();
                t.foreign('user_id').references('users.id').onDelete('CASCADE').onUpdate('CASCADE');
                t.integer('product_id').notNullable();
                t.foreign('product_id').references('products.id').onDelete('CASCADE').onUpdate('CASCADE');
                t.timestamp('created_at').defaultTo(knex.fn.now()).notNullable();
                t.timestamp('updated_at').defaultTo(knex.fn.now()).notNullable();
            })
        }
        return;
    })
    await knex.schema.hasTable('order_histories').then(function(exists){
        if(!exists){
            return knex.schema.createTable('order_histories',function(t){
                t.increments('id').primary();
                t.integer('total_amount').notNullable();
                t.string('pay_method').notNullable();
                t.string('status').notNullable();
                t.string('delivery_address').notNullable();
                t.integer('user_id').notNullable();
                t.foreign('user_id').references('users.id').onDelete('CASCADE').onUpdate('CASCADE');
                t.integer('shopping_cart_id').notNullable();
                t.foreign('shopping_cart_id').references('shopping_carts.id').onDelete('CASCADE').onUpdate('CASCADE');
                t.timestamp('created_at').defaultTo(knex.fn.now()).notNullable();
            })
        }
        return;
    })
    await knex.schema.hasTable('order_details').then(function(exists){
        if(!exists){
            return knex.schema.createTable('order_details',function(t){
                t.increments('id').primary();
                t.integer('shopping_cart_id').notNullable();
                t.foreign('shopping_cart_id').references('shopping_carts.id').onDelete('CASCADE').onUpdate('CASCADE');
                t.integer('order_history_id').notNullable();
                t.foreign('order_history_id').references('order_histories.id').onDelete('CASCADE').onUpdate('CASCADE');
            })
        }
        return;
    })
}


export async function down(knex: Knex): Promise<void> {
    await knex.schema.dropTableIfExists('order_details');
    await knex.schema.dropTableIfExists('order_histories');
    await knex.schema.dropTableIfExists('shopping_carts');
    await knex.schema.dropTableIfExists('product_views');
    await knex.schema.dropTableIfExists('product_likes');
    await knex.schema.dropTableIfExists('product_sizes');
    await knex.schema.dropTableIfExists('product_images');
    await knex.schema.dropTableIfExists('products');
}

