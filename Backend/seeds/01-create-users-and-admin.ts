import { Knex } from "knex";
import { hashPassword } from "../utils/hash";

export async function seed(knex: Knex): Promise<void> {
    // Deletes ALL existing entries
    await knex("login_records").del();
    await knex("accumulation").del();
    await knex("admin_info").del();
    await knex("user_info").del();   
    await knex("users").del();
    
    const hashedPassword = await hashPassword("1234")
    // Inserts seed entries
    const result: Array<{ id: number }> =
    await knex("users").insert([
        {account_name: "anonymous",email:"anonymous",password:"anonymous",is_admin:false,is_anonymous:true},
        {account_name: "admin1",email:"admin@1.com",password:hashedPassword,is_admin:true},
        {account_name: "admin2",email:"admin@2.com",password:hashedPassword,is_admin:true},
        {account_name: "jack",email:"jack@1.com",password:hashedPassword,is_admin:false,has_log_in:true},
        {account_name: "mary",email:"mary@1.com",password:hashedPassword,is_admin:false},
        {account_name: "teddy",email:"teddy@1.com",password:hashedPassword,is_admin:false}  
    ])
    .returning("id");

    await knex("user_info").insert([
        {first_name:"jack",last_name:"Ma",icon:"jack.img",slogan:"I am jack",area:"KowLoon",district:"Yau Tsim Mong",location:"Tai Ho Building",contact:"12345678",gender:"M",age_range:"19-24",reason:"Sport",learning_level:"Beginner",user_id:result[3].id},
        {first_name:"mary",last_name:"Yu",icon:"mary.img",slogan:"Yay",area:"New Territories",district:"Yuen Long",location:"Mansion A",contact:"12345678",gender:"F",age_range:"15-20",reason:"because of friends",learning_level:"Intermediate",user_id:result[4].id},
        {first_name:"teddy",last_name:"Gu",icon:"teddy.img",slogan:"Yay",area:"New Territories",district:"Yuen Long",location:"Mansion C",contact:"12345678",gender:"F",age_range:"25-35",reason:"because of friends",learning_level:"Intermediate",user_id:result[5].id}
    ])
    await knex("admin_info").insert([
        {tier:1,in_charge:"hi",user_id:result[1].id}
    ])
    await knex("accumulation").insert([
        {accumulation:20,user_id:result[4].id},
        {accumulation:20,user_id:result[3].id}
    ])
    await knex("login_records").insert([
        {user_id:result[4].id},
        {user_id:result[3].id}
    ])

};
