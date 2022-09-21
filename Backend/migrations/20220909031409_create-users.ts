import { Knex } from "knex";


export async function up(knex: Knex): Promise<void> {
    await knex.schema.hasTable('users').then(function(exists){
        if(!exists){
            return knex.schema.createTable('users',function(t){
                t.increments('id').primary();
                t.string('account_name').unique().notNullable();
                t.string('email').unique().notNullable();
                t.string('password').notNullable();
                t.boolean('is_admin').defaultTo(false);
                t.boolean('is_anonymous').defaultTo(false);
                t.timestamp('created_at').defaultTo(knex.fn.now());
                t.timestamp('updated_at').defaultTo(knex.fn.now());
                t.timestamp('last_login_at').defaultTo(knex.fn.now());
                t.string('default_contact');
                t.string('icon');
                t.text('slogan');
                t.boolean('is_delete').defaultTo(false)
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
                t.string('area');
                t.string('district');
                t.string('location');
                t.string('contact');
                t.string('gender');
                t.string('age_range');
                t.text('reason');
                t.string('learning_level');
                t.timestamp('created_at').defaultTo(knex.fn.now());
                t.timestamp('updated_at').defaultTo(knex.fn.now());
                t.integer('user_id');
                t.foreign('user_id').references('users.id').onDelete('CASCADE').onUpdate('CASCADE');
                t.boolean('is_delete').defaultTo(false)
            })
        }
        return;
    })

    await knex.schema.hasTable('admin_info').then(function(exists){
        if(!exists){
            return knex.schema.createTable('admin_info',function(t){
                t.increments('id').primary();
                t.integer('tier');
                t.string('in_charge');
                t.integer('user_id');
                t.foreign('user_id').references('users.id').onDelete('CASCADE').onUpdate('CASCADE');
                t.boolean('is_delete').defaultTo(false)
            })
        }
        return;
    })
    await knex.schema.hasTable('accumulation').then(function(exists){
        if(!exists){
            return knex.schema.createTable('accumulation',function(t){
                t.increments('id').primary();
                t.integer('accumulation');
                t.timestamp('date').defaultTo(knex.fn.now());
                t.integer('user_id');
                t.foreign('user_id').references('users.id').onDelete('CASCADE').onUpdate('CASCADE');
            })
        }
        return;
    })
    await knex.schema.hasTable('login_records').then(function(exists){
        if(!exists){
            return knex.schema.createTable('login_records',function(t){
                t.increments('id').primary();
                t.integer('user_id');
                t.foreign('user_id').references('users.id').onDelete('CASCADE').onUpdate('CASCADE');
                t.timestamp('login_at').defaultTo(knex.fn.now());
                t.timestamp('logout_at').defaultTo(knex.fn.now());
            })
        }
        return;
    })

}

export async function down(knex: Knex): Promise<void> {
    await knex.schema.dropTableIfExists('login_records');
    await knex.schema.dropTableIfExists('accumulation');
    await knex.schema.dropTableIfExists('admin_info'); 
    await knex.schema.dropTableIfExists('user_info');   
    await knex.schema.dropTableIfExists('users');
}

