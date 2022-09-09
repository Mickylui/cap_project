import { Knex } from "knex";


export async function up(knex: Knex): Promise<void> {
    knex.schema.hasTable('users').then(function(exists){
        if(!exists){
            return knex.schema.createTable('users',function(t){
                t.increments('id').primary();
                t.string('name').unique().notNullable();
                t.string('email').unique().notNullable();
                t.string('password').notNullable();
                t.boolean('is_admin').notNullable();
                t.timestamp('created_at').defaultTo(knex.fn.now()).notNullable();
                t.timestamp('updated_at').defaultTo(knex.fn.now()).notNullable();
                t.timestamp('last_login_at').defaultTo(knex.fn.now()).notNullable();
            })
        }
        return;
    })
}


export async function down(knex: Knex): Promise<void> {
    knex.schema.dropTableIfExists('users');
}

