import { Knex } from "knex";

export async function seed(knex: Knex): Promise<void> {
    // Deletes ALL existing entries
    await knex("complaints").del();
    await knex("post_likes").del();
    await knex("post_views").del();
    await knex("post_images").del();
    await knex("post_tags").del();
    await knex("tags").del();
    await knex("posts").del();

    const users = (await knex.raw(`SELECT * FROM users`)).rows
    // Inserts seed entries
    await knex("posts").insert([
        {title:"gathering",event_date:"2022-9-16",event_time:"18:00-19:00",event_location:"TW",description:"eat something",contact:"12345678",is_complain:false,is_ordinary:true,is_event:true,user_id:users[3].id},
        {title:"",event_date:"",event_time:"",event_location:"",description:"enjoy a lot",contact:"",is_complain:false,is_ordinary:true,is_event:true,user_id:users[3].id},
        {title:"practice",event_date:"2022-9-16",event_time:"18:00-19:00",event_location:"TW",description:"practice together",contact:"12345678",is_complain:false,is_ordinary:true,is_event:true,user_id:users[4].id},
        {title:"",event_date:"",event_time:"",event_location:"",description:"yay",contact:"",is_complain:false,is_ordinary:true,is_event:true,user_id:users[4].id}
       
    ]);


    
    const posts = (await knex.raw(`SELECT * FROM posts`)).rows

    await knex("tags").insert([
        {tag:"practice"},
        {tag:"gathering"},
        {tag:"talk"},
        {tag:"recruitment"},
        {tag:"lesson information"},
        {tag:"product promotion"},
        {tag:"skateboard design"},
        {tag:"art related workshop"},{tag:"skateboard maintenance"},{tag:"competition"},
        {tag:"skateboard performance"}
    ])
    
    const tags = (await knex.raw(`SELECT * FROM tags`)).rows
    await knex("post_tags").insert([
        {post_id:posts[0].id,tag_id:tags[1].id},
        {post_id:posts[1].id,tag_id:tags[1].id},
        {post_id:posts[2].id,tag_id:tags[2].id},
        {post_id:posts[3].id,tag_id:tags[2].id},
    ])

    await knex("post_images").insert([
        {post_id:posts[0].id,image:"hello11img"},
        {post_id:posts[1].id,image:"bye11img"},
        {post_id:posts[2].id,image:"hello22img"},
        {post_id:posts[3].id,image:"bye22img"},
    ])

    await knex("post_views").insert([
        {post_id:posts[0].id,view_by_user_id:users[3].id},
        {post_id:posts[1].id,view_by_user_id:users[3].id},
        {post_id:posts[2].id,view_by_user_id:users[4].id},
        {post_id:posts[3].id,view_by_user_id:users[4].id},
    ])

    await knex("post_likes").insert([
        {post_id:posts[0].id,like_by_user_id:users[4].id},
        {post_id:posts[1].id,like_by_user_id:users[3].id},
        {post_id:posts[2].id,like_by_user_id:users[3].id},
        {post_id:posts[3].id,like_by_user_id:users[4].id},
    ])
    await knex("complaints").insert([
        {post_id:posts[0].id,reason:"ABCDEF",description:"the coach is late",complainant_id:users[3].id,complainee_id:users[5].id},    
    ])

};
