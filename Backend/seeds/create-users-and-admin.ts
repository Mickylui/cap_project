import { Knex } from "knex";

export async function seed(knex: Knex): Promise<void> {
    // Deletes ALL existing entries
    await knex("user_info").del();
    await knex("admin_info").del();
    await knex("users").del();

    // Inserts seed entries
    await knex("users").insert([
        {account_name: "jack",email:"jack@1.com",password:"1234",is_admin:false},
        {account_name: "mary",email:"mary@1.com",password:"1234",is_admin:false},
        {account_name: "admin",email:"admin@1.com",password:"1234",is_admin:true}
    ]);

    await knex("user_info").insert([
        {first_name:'Y',last_name:'M',icon:'jack.img',slogan:'I am jack',address:'TW',contact:'12345678',gender:'M',age_range:'15-20',reasons:'Friend',learning_level:'2',user_id:1}
    ])

    await knex("admin_info").insert([
        {tier:1,in_charage:'hi',user_id:3}
    ])

};
