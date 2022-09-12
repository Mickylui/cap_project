import { Knex } from "knex";


export async function up(knex: Knex): Promise<void> {
    await knex.schema.hasTable('users').then(function(exists){
        if(!exists){
            return knex.schema.createTable('users',function(t){
                t.increments('id').primary();
                t.string('account_name').unique().notNullable();
                t.string('email').unique().notNullable();
                t.string('password').notNullable();
                t.boolean('is_admin').notNullable();
                t.timestamp('created_at').defaultTo(knex.fn.now()).notNullable();
            })
        }
        return;
    })

    await knex.schema.hasTable('user_info').then(function(exists){
        if(!exists){
            return knex.schema.createTable('user_info',function(t){
                t.increments('id').primary();
                t.string('first_name');
                t.string('last_name');
                t.string('icon');
                t.text('slogan');
                t.text('address').unique();
                t.string('contact').unique();
                t.string('gender');
                t.string('age_range');
                t.text('reasons');
                t.string('learning_level');
                t.timestamp('updated_at').defaultTo(knex.fn.now()).notNullable();
                t.timestamp('last_login_at').defaultTo(knex.fn.now()).notNullable();
                t.integer('user_id').notNullable();
                t.foreign('user_id').references('users.id').onDelete('CASCADE').onUpdate('CASCADE');
            })
        }
        return;
    })

    await knex.schema.hasTable('admin_info').then(function(exists){
        if(!exists){
            return knex.schema.createTable('admin_info',function(t){
                t.increments('id').primary();
                t.integer('tier').notNullable();
                t.string('in_charage').notNullable();
                t.integer('user_id').notNullable();
                t.foreign('user_id').references('users.id').onDelete('CASCADE').onUpdate('CASCADE');
            })
        }
        return;
    })
}


export async function down(knex: Knex): Promise<void> {
    await knex.schema.dropTableIfExists('user_info');
    await knex.schema.dropTableIfExists('admin_info');
    await knex.schema.dropTableIfExists('users');
}

