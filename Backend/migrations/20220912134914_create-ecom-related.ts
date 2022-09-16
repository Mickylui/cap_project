import { Knex } from "knex";


export async function up(knex: Knex): Promise<void> {
    await knex.schema.hasTable('products').then(function(exists){
        if(!exists){
            return knex.schema.createTable('products',function(t){
                t.increments('id').primary();
                t.string('name').unique();
                t.text('description');
                t.decimal('unit_price',6,2);
                t.integer('quantity');
                t.timestamp('created_at').defaultTo(knex.fn.now());
                t.timestamp('updated_at').defaultTo(knex.fn.now());
            })
        }
        return;
    })

    await knex.schema.hasTable('product_images').then(function(exists){
        if(!exists){
            return knex.schema.createTable('product_images',function(t){
                t.increments('id').primary();
                t.text('image');
                t.integer('product_id');
                t.foreign('product_id').references('products.id').onDelete('CASCADE').onUpdate('CASCADE');
            })
        }
        return;
    })

    await knex.schema.hasTable('product_sizes').then(function(exists){
        if(!exists){
            return knex.schema.createTable('product_sizes',function(t){
                t.increments('id').primary();
                t.decimal('size',6,3);
                t.integer('product_id');
                t.foreign('product_id').references('products.id').onDelete('CASCADE').onUpdate('CASCADE');
            })
        }
        return;
    })
    await knex.schema.hasTable('product_likes').then(function(exists){
        if(!exists){
            return knex.schema.createTable('product_likes',function(t){
                t.increments('id').primary();
                t.integer('user_id');
                t.foreign('user_id').references('users.id').onDelete('CASCADE').onUpdate('CASCADE');
                t.integer('product_id');
                t.foreign('product_id').references('products.id').onDelete('CASCADE').onUpdate('CASCADE');
                t.timestamp('like_at').defaultTo(knex.fn.now());
            })
        }
        return;
    })
    await knex.schema.hasTable('product_views').then(function(exists){
        if(!exists){
            return knex.schema.createTable('product_views',function(t){
                t.increments('id').primary();
                t.timestamp('view_begin').defaultTo(knex.fn.now());
                t.timestamp('view_end').defaultTo(knex.fn.now());
                t.integer('user_id');
                t.foreign('user_id').references('users.id').onDelete('CASCADE').onUpdate('CASCADE');
                t.integer('product_id');
                t.foreign('product_id').references('products.id').onDelete('CASCADE').onUpdate('CASCADE');              
            })
        }
        return;
    })
    
    await knex.schema.hasTable('shopping_carts').then(function(exists){
        if(!exists){
            return knex.schema.createTable('shopping_carts',function(t){
                t.increments('id').primary();
                t.integer('user_id');
                t.foreign('user_id').references('users.id').onDelete('CASCADE').onUpdate('CASCADE');
                t.integer('product_id');
                t.foreign('product_id').references('products.id').onDelete('CASCADE').onUpdate('CASCADE');
                t.decimal('size',6,3);
                t.integer('quantity');
                t.timestamp('created_at').defaultTo(knex.fn.now());
                t.timestamp('updated_at').defaultTo(knex.fn.now());
            })
        }
        return;
    })
    await knex.schema.hasTable('order_history').then(function(exists){
        if(!exists){
            return knex.schema.createTable('order_history',function(t){
                t.increments('id').primary();
                t.decimal('total_amount',8,2);
                t.string('pay_method');
                t.timestamp('pay_date').defaultTo(knex.fn.now());
                t.string('status');
                t.string('delivery_address');
                t.string('email');
                t.string('contact');
                t.integer('user_id');
                t.foreign('user_id').references('users.id').onDelete('CASCADE').onUpdate('CASCADE');
                t.timestamp('created_at').defaultTo(knex.fn.now());
                t.timestamp('updated_at').defaultTo(knex.fn.now());
            })
        }
        return;
    })
    await knex.schema.hasTable('order_details').then(function(exists){
        if(!exists){
            return knex.schema.createTable('order_details',function(t){
                t.increments('id').primary();
                t.integer('product_id');
                t.foreign('product_id').references('products.id').onDelete('CASCADE').onUpdate('CASCADE');
                t.decimal('order_size',6,3);
                t.integer('order_quantity');
                t.decimal('order_unit_price',6,2);
                t.integer('order_history_id');
                t.foreign('order_history_id').references('order_history.id').onDelete('CASCADE').onUpdate('CASCADE');
            })
        }
        return;
    })
}


export async function down(knex: Knex): Promise<void> {
    await knex.schema.dropTableIfExists('order_details');
    await knex.schema.dropTableIfExists('order_history');
    await knex.schema.dropTableIfExists('shopping_carts');
    await knex.schema.dropTableIfExists('product_views');
    await knex.schema.dropTableIfExists('product_likes');
    await knex.schema.dropTableIfExists('product_sizes');
    await knex.schema.dropTableIfExists('product_images');
    await knex.schema.dropTableIfExists('products');
}

