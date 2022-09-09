import { Knex } from "knex";

export async function seed(knex: Knex): Promise<void> {
    // Deletes ALL existing entries
    await knex("users").del();

    // Inserts seed entries
    await knex("users").insert([
        {name: "jack",email:"jack@1.com",password:"1234",is_admin:false},
        {name: "mary",email:"mary@1.com",password:"1234",is_admin:false},
        {name: "admin",email:"admin@1.com",password:"1234",is_admin:true}
    ]);
};
