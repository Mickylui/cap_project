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
        {account_name: "jack",email:"jack@1.com",password:hashedPassword,is_admin:false,default_contact:"jack@1.com",icon:"jack.img",slogan:"I am jack", created_at:'2022-04-10 20:00:00'},
        {account_name: "mary",email:"mary@1.com",password:hashedPassword,is_admin:false,default_contact:"jack@1.com",icon:"mary.img",slogan:"Yay", created_at:'2022-04-10 20:00:00'},
        {account_name: "teddy",email:"teddy@1.com",password:hashedPassword,is_admin:false,default_contact:"jack@1.com", icon:"teddy.img",slogan:"Yay", created_at:'2022-05-10 20:00:00'},
        {account_name: "dorri",email:"dorri@1.com",password:hashedPassword,is_admin:false,default_contact:"dorri@1.com", created_at:'2022-06-10 20:00:00'},
        {account_name: "happy",email:"happy@1.com",password:hashedPassword,is_admin:false,default_contact:"happy@1.com", created_at:'2022-06-10 20:00:00'},
        {account_name: "lora",email:"lora@1.com",password:hashedPassword,is_admin:false,default_contact:"dorri@1.com", created_at:'2022-07-10 20:00:00'},
        {account_name: "peter",email:"peter@1.com",password:hashedPassword,is_admin:false,default_contact:"happy@1.com", created_at:'2022-07-10 20:00:00'},
        {account_name: "funny",email:"funny@1.com",password:hashedPassword,is_admin:false,default_contact:"dorri@1.com", created_at:'2022-08-10 20:00:00'},
        {account_name: "dassi",email:"dassi@1.com",password:hashedPassword,is_admin:false,default_contact:"happy@1.com", created_at:'2022-08-10 20:00:00'},
        {account_name: "halo",email:"halo@1.com",password:hashedPassword,is_admin:false,default_contact:"happy@1.com", created_at:'2022-09-10 20:00:00'},
    ])
    .returning("id");

    await knex("user_info").insert([
        {first_name:"anonymous",last_name:"anonymous",area:"KowLoon",district:"Yau Tsim Mong",location:"anonymous",contact:"anonymous",gender:"anonymous",age_range:"anonymous",reason:"anonymous",learning_level:"anonymous",user_id:result[0].id},
        {first_name:"admin1",last_name:"admin1",area:"admin1",district:"admin1",location:"admin1",contact:"admin1",gender:"admin1",age_range:"admin1",reason:"admin1",learning_level:"admin1",user_id:result[1].id},
        {first_name:"admin2",last_name:"admin2",area:"admin2",district:"admin2",location:"admin2",contact:"admin2",gender:"admin2",age_range:"admin2",reason:"admin2",learning_level:"admin2",user_id:result[2].id},
        {first_name:"jack",last_name:"Ma",area:"KowLoon",district:"Yau Tsim Mong",location:"Tai Ho Building",contact:"12345678",gender:"M",age_range:"19-24",reason:"Sport",learning_level:"Beginner",user_id:result[3].id},
        {first_name:"mary",last_name:"Yu",area:"New Territories",district:"Yuen Long",location:"Mansion A",contact:"12345678",gender:"F",age_range:"12-18",reason:"because of friends",learning_level:"Intermediate",user_id:result[4].id},
        {first_name:"teddy",last_name:"Gu", area:"New Territories",district:"Yuen Long",location:"Mansion C",contact:"12345678",gender:"F",age_range:"25-35",reason:"because of friends",learning_level:"Intermediate",user_id:result[5].id},
        {first_name:"dorri",last_name:"Gu", area:"New Territories",district:"Yuen Long",location:"Mansion C",contact:"12345678",gender:"F",age_range:"25-35",reason:"because of friends",learning_level:"Intermediate",user_id:result[6].id},
        {first_name:"happy",last_name:"Gu", area:"New Territories",district:"Yuen Long",location:"Mansion C",contact:"12345678",gender:"F",age_range:"19-24",reason:"because of friends",learning_level:"Intermediate",user_id:result[7].id},
        {first_name:"lora",last_name:"Gu", area:"New Territories",district:"Yuen Long",location:"Mansion C",contact:"12345678",gender:"F",age_range:"19-24",reason:"because of friends",learning_level:"Intermediate",user_id:result[8].id},
        {first_name:"peter",last_name:"Gu", area:"New Territories",district:"Yuen Long",location:"Mansion C",contact:"12345678",gender:"F",age_range:"25-35",reason:"because of friends",learning_level:"Intermediate",user_id:result[9].id},
        {first_name:"funny",last_name:"Gu", area:"New Territories",district:"Yuen Long",location:"Mansion C",contact:"12345678",gender:"F",age_range:"15-20",reason:"because of friends",learning_level:"Intermediate",user_id:result[10].id},
        {first_name:"dassi",last_name:"Gu", area:"New Territories",district:"Yuen Long",location:"Mansion C",contact:"12345678",gender:"F",age_range:"35-55",reason:"because of friends",learning_level:"Intermediate",user_id:result[11].id},
        {first_name:"halo",last_name:"Gu", area:"New Territories",district:"Yuen Long",location:"Mansion C",contact:"12345678",gender:"F",age_range:"19-24",reason:"because of friends",learning_level:"Intermediate",user_id:result[12].id}
    ])
    await knex("admin_info").insert([
        {tier:1,in_charge:"hi",user_id:result[1].id}
    ])
    await knex("accumulation").insert([
        {accumulation:20,user_id:result[4].id},
        {accumulation:20,user_id:result[3].id}
    ])
    await knex("login_records").insert([
        {user_id:result[4].id,login_at:'2022-07-10 20:00:00'},
        {user_id:result[3].id,login_at:'2022-09-10 20:00:00'},
        {user_id:result[5].id,login_at:'2022-09-10 20:00:00'},
        {user_id:result[6].id,login_at:'2022-09-10 20:00:00'},
        {user_id:result[4].id,login_at:'2022-09-10 20:00:00'},
        {user_id:result[7].id,login_at:'2022-08-10 20:00:00'},
        {user_id:result[7].id,login_at:'2022-09-10 20:00:00'},
        {user_id:result[6].id,login_at:'2022-07-10 20:00:00'},
        {user_id:result[5].id,login_at:'2022-06-10 20:00:00'}
    ])

};
