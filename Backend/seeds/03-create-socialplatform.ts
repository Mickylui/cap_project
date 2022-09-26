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

    const users = (await knex.raw(`SELECT * FROM users`)).rows;
    // Inserts seed entries
    await knex("posts").insert([
        {
            title: "Product promotion!",
            event_date: "2022-9-16",
            event_time: "18:00-19:00",
            event_location: "TW",
            description: "All product 10% off! only on this week.",
            contact: "56346653",
            is_complain: false,
            is_ordinary: true,
            is_event: true,
            user_id: users[1].id,
            created_at: "2022-03-10 20:00:00",
        },
        {
            title: "Join our art workshop!",
            event_date: "2022-9-16",
            event_time: "18:00-19:00",
            event_location: "TW",
            description: "Workshop on next week.Email to info@skwsp.com for more information or contact me if you interest.",
            contact: "56346653",
            is_complain: false,
            is_ordinary: true,
            is_event: true,
            user_id: users[2].id,
            created_at: "2022-04-10 20:00:00",
        },
        {
            title: "Maintenance workshop! next week",
            event_date: "2022-9-16",
            event_time: "18:00-19:00",
            event_location: "TW",
            description: "Teaching skateboard repair skill.Email to info@skwsp.com for more information or contact me if you interest.",
            contact: "56346653",
            is_complain: false,
            is_ordinary: true,
            is_event: true,
            user_id: users[2].id,
            created_at: "2022-05-10 20:00:00",
        },
        {
            title: "New competition for all of you!",
            event_date: "2022-9-16",
            event_time: "18:00-19:00",
            event_location: "TW",
            description: "Email to info@skwsp.com for more information or contact me if you interest.",
            contact: "56346653",
            is_complain: false,
            is_ordinary: true,
            is_event: true,
            user_id: users[1].id,
            created_at: "2022-07-10 20:00:00",
        },
        {
            title: "Let's gather!",
            event_date: "2022-9-16",
            event_time: "18:00-19:00",
            event_location: "TW",
            description: "Venue on 4/F KFC Building. Whatsapp me before come.",
            contact: "58744362",
            is_complain: false,
            is_ordinary: false,
            is_event: true,
            user_id: users[3].id,
            created_at: "2022-07-10 20:00:00",
        },
        {
            title: "Take a look at this!",
            event_date: "",
            event_time: "",
            event_location: "",
            description: "It is so cool.",
            contact: "",
            is_complain: false,
            is_ordinary: false,
            is_event: false,
            user_id: users[3].id,
            created_at: "2022-08-10 20:00:00",
        },
        {
            title: "Join us and practice!",
            event_date: "2022-9-16",
            event_time: "18:00-19:00",
            event_location: "TW",
            description: "Whatsapp me if want to join the practice.",
            contact: "53453523",
            is_complain: false,
            is_ordinary: false,
            is_event: true,
            user_id: users[4].id,
            created_at: "2022-09-10 20:00:00",
        },
        {
            title: "my new record!",
            event_date: "",
            event_time: "",
            event_location: "",
            description: "yay",
            contact: "",
            is_complain: false,
            is_ordinary: false,
            is_event: false,
            user_id: users[4].id,
            created_at: "2022-08-10 20:00:00",
        },
        {
            title: "Maintenance workshop! next week!",
            event_date: "2022-9-20",
            event_time: "18:00-19:00",
            event_location: "TW",
            description: "Teaching skateboard repair skill.Email to info@skwsp.com for more information or contact me if you interest.",
            contact: "57345653",
            is_complain: false,
            is_ordinary: false,
            is_event: true,
            user_id: users[6].id,
            created_at: "2022-09-20 20:00:00",
        },
        {
            title: "New talk in next week!",
            event_date: "2022-9-22",
            event_time: "18:00-19:00",
            event_location: "TW",
            description: "ted talk",
            contact: "Talk about how to be a pro-skateboarder.",
            is_complain: false,
            is_ordinary: false,
            is_event: true,
            user_id: users[7].id,
            created_at: "2022-09-20 20:00:00",
        },
    ]);

    const posts = (await knex.raw(`SELECT * FROM posts`)).rows;

    await knex("tags").insert([
        { tag: "practice" },
        { tag: "gathering" },
        { tag: "talk" },
        { tag: "recruitment" },
        { tag: "lesson information" },
        { tag: "product promotion" },
        { tag: "skateboard design" },
        { tag: "art related workshop" },
        { tag: "skateboard maintenance" },
        { tag: "competition" },
        { tag: "skateboard performance" },
        { tag: "question" },
        { tag: "sharing" },
    ]);

    const tags = (await knex.raw(`SELECT * FROM tags`)).rows;
    await knex("post_tags").insert([
        { post_id: posts[0].id, tag_id: tags[5].id },
        { post_id: posts[1].id, tag_id: tags[7].id },
        { post_id: posts[2].id, tag_id: tags[8].id },
        { post_id: posts[3].id, tag_id: tags[9].id },
        { post_id: posts[4].id, tag_id: tags[1].id },
        { post_id: posts[5].id, tag_id: tags[1].id },
        { post_id: posts[5].id, tag_id: tags[12].id },
        { post_id: posts[6].id, tag_id: tags[2].id },
        { post_id: posts[7].id, tag_id: tags[2].id },
        { post_id: posts[7].id, tag_id: tags[12].id },
        { post_id: posts[8].id, tag_id: tags[8].id },
        { post_id: posts[9].id, tag_id: tags[2].id },
    ]);

    await knex("post_images").insert([
        { post_id: posts[4].id, image: "hello11img" },
        { post_id: posts[5].id, image: "bye11img" },
        { post_id: posts[6].id, image: "hello22img" },
        { post_id: posts[7].id, image: "bye22img" },
    ]);

    await knex("post_views").insert([
        { post_id: posts[5].id, view_by_user_id: users[0].id },
        { post_id: posts[6].id, view_by_user_id: users[0].id },
        { post_id: posts[5].id, view_by_user_id: users[1].id },
        { post_id: posts[6].id, view_by_user_id: users[2].id },
        { post_id: posts[4].id, view_by_user_id: users[1].id },
        { post_id: posts[7].id, view_by_user_id: users[2].id },
        { post_id: posts[4].id, view_by_user_id: users[3].id },
        { post_id: posts[5].id, view_by_user_id: users[3].id },
        { post_id: posts[6].id, view_by_user_id: users[4].id },
        { post_id: posts[7].id, view_by_user_id: users[4].id },
        { post_id: posts[4].id, view_by_user_id: users[6].id },
        { post_id: posts[4].id, view_by_user_id: users[7].id },
    ]);

    await knex("post_likes").insert([
        { post_id: posts[4].id, like_by_user_id: users[4].id },
        { post_id: posts[5].id, like_by_user_id: users[3].id, is_dislike: true },
        { post_id: posts[6].id, like_by_user_id: users[3].id, is_dislike: true },
        { post_id: posts[7].id, like_by_user_id: users[4].id, is_dislike: true },
        { post_id: posts[6].id, like_by_user_id: users[6].id },
        { post_id: posts[7].id, like_by_user_id: users[7].id },
    ]);
    await knex("complaints").insert([
        {
            post_id: posts[4].id,
            reason: "ABCDEF",
            description: "the coach is late",
            complainant_id: users[3].id,
            complainee_id: users[5].id,
        },
    ]);
}
