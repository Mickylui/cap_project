import { Knex } from "knex";
import { winstonLogger } from "../utils/winstonLogger";

export class PostService {
    constructor(private knex: Knex) {}
    async getAllPost(userId: string) {
        try {
            const allPost = (
                await this.knex.raw(
                    `
                SELECT posts.id,
                    posts.title,
                    posts.event_date,
                    posts.event_time,
                    posts.event_location,
                    posts.description,
                    posts.contact,
                    posts.created_at,
                    posts.updated_at,
                    posts.is_ordinary,
                    posts.is_event,
                    posts.display_push,
                    users.account_name,
                    json_agg(DISTINCT users.icon) icon,
                    json_agg(DISTINCT post_images.image) image,
                    json_agg(DISTINCT tags.tag) tag,
                    post_likes.like_by_user_id = ? AS is_liked_by_user,
                    COUNT(post_likes.id)
                FROM posts
                    LEFT JOIN users ON users.id = posts.user_id
                    LEFT JOIN post_images ON post_images.post_id = posts.id
                    LEFT JOIN post_tags ON post_tags.post_id = posts.id
                    LEFT JOIN tags ON tags.id = post_tags.tag_id
                    LEFT JOIN post_likes ON post_likes.post_id = posts.id
                GROUP BY (
                        posts.id,
                        users.account_name,
                        post_likes.like_by_user_id
                    )
                ORDER BY posts.display_push DESC;
                        `,
                    [userId]
                )
            ).rows;

            console.log("allPost:", allPost);
            return allPost;
        } catch (error) {
            winstonLogger.error(error);
            return;
        }
    }
    async getSearchTagPost(tag: string, userId: string) {
        try {
            console.log("tag:", tag);
            console.log("userId:", userId);
            const allPost = (
                await this.knex.raw(
                    `
                WITH tmp AS (
                    SELECT *
                    FROM tags
                    WHERE tags.tag SIMILAR TO ?
                )
                SELECT posts.id,
                    posts.title,
                    posts.event_date,
                    posts.event_time,
                    posts.event_location,
                    posts.description,
                    posts.contact,
                    posts.created_at,
                    posts.updated_at,
                    posts.is_ordinary,
                    posts.is_event,
                    posts.display_push,
                    users.account_name,
                    json_agg(DISTINCT users.icon) icon,
                    json_agg(DISTINCT post_images.image) image,
                    json_agg(DISTINCT tmp.tag) tag,
                    post_likes.like_by_user_id = ? AS is_liked_by_user,
                    COUNT(post_likes.id)
                FROM posts
                    LEFT JOIN users ON users.id = posts.user_id
                    LEFT JOIN post_images ON post_images.post_id = posts.id
                    LEFT JOIN post_tags ON post_tags.post_id = posts.id
                    RIGHT JOIN tmp ON tmp.id = post_tags.tag_id
                     LEFT JOIN post_likes ON post_likes.post_id = posts.id
                GROUP BY (posts.id, users.account_name, post_likes.like_by_user_id)
                ORDER BY posts.display_push DESC;
                        `,
                    [tag, userId]
                )
            ).rows;

            console.log("getSearchTagPost:", allPost);
            return allPost;
        } catch (error) {
            winstonLogger.error(error.toString());
            return;
        }
    }
    async contentPost(keyword: string, userId: string) {
        try {
            console.log("keyword:", keyword);
            console.log("userId:", userId);
            const allPost = (
                await this.knex.raw(
                    `
                    SELECT posts.id,
                    posts.title,
                    posts.event_date,
                    posts.event_time,
                    posts.event_location,
                    posts.description,
                    posts.contact,
                    posts.created_at,
                    posts.updated_at,
                    posts.is_ordinary,
                    posts.is_event,
                    posts.display_push,
                    users.account_name,
                    json_agg(DISTINCT users.icon) icon,
                    json_agg(DISTINCT post_images.image) image,
                    json_agg(DISTINCT tags.tag) tag,
                    post_likes.like_by_user_id = ? AS is_liked_by_user,
                    COUNT(post_likes.id)
                FROM posts
                    LEFT JOIN users ON users.id = posts.user_id
                    LEFT JOIN post_images ON post_images.post_id = posts.id
                    LEFT JOIN post_tags ON post_tags.post_id = posts.id
                    LEFT JOIN tags ON tags.id = post_tags.tag_id
                    LEFT JOIN post_likes ON post_likes.post_id = posts.id
                WHERE posts.description = ?
                GROUP BY (
                        posts.id,
                        users.account_name,
                        post_likes.like_by_user_id
                    )
                ORDER BY posts.display_push DESC;
                        `,
                    [userId, keyword]
                )
            ).rows;

            console.log("getSearchTagPost:", allPost);
            return allPost;
        } catch (error) {
            winstonLogger.error(error.toString());
            return;
        }
    }
    async addPost(fields: any, files: any) {
        const txn = await this.knex.transaction();
        const tagsArr = fields.tagItems.split(",");

        // console.log("fields:", fields);
        // console.log("files:", files);
        // console.log("tagsArr:", tagsArr);

        let imageFiles = [];
        if (files === undefined) {
            imageFiles = [];
        } else {
            if (files.length > 1) {
                imageFiles = files;
            } else if (files.length === 1) {
                imageFiles.push(files);
            }
        }
        console.log("imageFiles:", imageFiles);
        try {
            const isAdmin: object = await txn("users")
                .select("is_admin")
                .where(this.knex.raw("id = ?", parseInt(fields.user_id)));
            // .where("id", parseInt(fields.user_id));
            console.log("isAdmin", isAdmin);
            let databaseTagsArr = [];
            // if field.isEventPost false
            // console.log("isEventPost:", fields.isEventPost);
            if (fields.isEventPost === "false") {
                if (isAdmin["is_admin"]) {
                    let postId = await txn("posts")
                        .insert({
                            user_id: fields.user_id,
                            title: fields.title,
                            description: fields.description,
                            is_complain: false,
                            is_ordinary: true,
                            is_event: false,
                        })
                        .returning("id");
                    console.log("postId:", postId);

                    for (let i = 0; i < imageFiles.length; i++) {
                        await txn("post_images").insert({
                            post_id: postId[0].id,
                            image: imageFiles[i].newFilename,
                        });
                        console.log("a:");
                    }
                    for (let i = 0; i < tagsArr.length; i++) {
                        const exitTags = await txn("tags")
                            .select("*")
                            .where("tag", tagsArr[i])
                            .first();
                        console.log("exitTags:", exitTags);
                        if (exitTags) {
                            let tagsId = exitTags.id;
                            databaseTagsArr.push({ id: tagsId });
                        } else {
                            let tagsId = await txn("tags")
                                .insert({
                                    tag: tagsArr[i],
                                })
                                .returning("id");
                            // console.log("tagsId111:", tagsId);
                            databaseTagsArr.push(tagsId[0]);
                            // console.log("databaseTagsArr1:", databaseTagsArr);
                        }
                    }
                    for (let i = 0; i < databaseTagsArr.length; i++) {
                        await txn("post_tags").insert({
                            post_id: postId[0].id,
                            tag_id: databaseTagsArr[i].id,
                        });
                    }
                    // console.log("databaseTagsArr:", databaseTagsArr);
                    databaseTagsArr = [];
                } else {
                    let postId = await txn("posts")
                        .insert({
                            user_id: fields.user_id,
                            title: fields.title,
                            description: fields.description,
                            is_complain: false,
                            is_ordinary: false,
                            is_event: false,
                        })
                        .returning("id");
                    // console.log("postId:", postId);

                    for (let i = 0; i < imageFiles.length; i++) {
                        await txn("post_images").insert({
                            post_id: postId[0].id,
                            image: imageFiles[i].newFilename,
                        });
                    }
                    for (let i = 0; i < tagsArr.length; i++) {
                        const exitTags = await txn("tags")
                            .select("*")
                            .where("tag", tagsArr[i])
                            .first();
                        if (exitTags) {
                            let tagsId = exitTags.id;
                            // console.log("exitTags:", tagsId);
                            databaseTagsArr.push({ id: tagsId });
                        } else {
                            let tagsId = await txn("tags")
                                .insert({
                                    tag: tagsArr[i],
                                })
                                .returning("id");
                            databaseTagsArr.push(tagsId[0]);
                        }
                    }
                    // console.log("databaseTagsArr:", databaseTagsArr);
                    for (let i = 0; i < databaseTagsArr.length; i++) {
                        await txn("post_tags").insert({
                            post_id: postId[0].id,
                            tag_id: databaseTagsArr[i].id,
                        });
                    }
                    // console.log("databaseTagsArr:", databaseTagsArr);
                    databaseTagsArr = [];
                }
            } else {
                const time = `${fields.startingTime}-${fields.endingTime}`;
                if (isAdmin["is_admin"]) {
                    let postId = await txn("posts")
                        .insert({
                            user_id: fields.user_id,
                            title: fields.title,
                            event_date: fields.eventDate,
                            event_time: time,
                            event_location: fields.eventLocation,
                            description: fields.description,
                            contact: fields.eventContact,
                            is_complain: false,
                            is_ordinary: true,
                            is_event: true,
                        })
                        .returning("id");
                    // console.log("postId:", postId);

                    for (let i = 0; i < imageFiles.length; i++) {
                        await txn("post_images").insert({
                            post_id: postId[0].id,
                            image: imageFiles[i].newFilename,
                        });
                    }
                    for (let i = 0; i < tagsArr.length; i++) {
                        const exitTags = await txn("tags")
                            .select("*")
                            .where("tag", tagsArr[i])
                            .first();
                        if (exitTags) {
                            let tagsId = exitTags.id;
                            // console.log("exitTags:", tagsId);
                            databaseTagsArr.push({ id: tagsId });
                        } else {
                            let tagsId = await txn("tags")
                                .insert({
                                    tag: tagsArr[i],
                                })
                                .returning("id");
                            databaseTagsArr.push(tagsId[0]);
                        }
                    }
                    // console.log("databaseTagsArr:", databaseTagsArr);
                    for (let i = 0; i < databaseTagsArr.length; i++) {
                        await txn("post_tags").insert({
                            post_id: postId[0].id,
                            tag_id: databaseTagsArr[i].id,
                        });
                    }
                    databaseTagsArr = [];
                } else {
                    let postId = await txn("posts")
                        .insert({
                            user_id: fields.user_id,
                            title: fields.title,
                            event_date: fields.eventDate,
                            event_time: time,
                            event_location: fields.eventLocation,
                            description: fields.description,
                            contact: fields.eventContact,
                            is_complain: false,
                            is_ordinary: false,
                            is_event: true,
                        })
                        .returning("id");
                    // console.log("postId:", postId);

                    for (let i = 0; i < imageFiles.length; i++) {
                        await txn("post_images").insert({
                            post_id: postId[0].id,
                            image: imageFiles[i].newFilename,
                        });
                    }
                    for (let i = 0; i < tagsArr.length; i++) {
                        const exitTags = await txn("tags")
                            .select("*")
                            .where("tag", tagsArr[i])
                            .first();
                        if (exitTags) {
                            let tagsId = exitTags.id;
                            // console.log("exitTags11:", tagsId);
                            databaseTagsArr.push({ id: tagsId });
                        } else {
                            let tagsId = await txn("tags")
                                .insert({
                                    tag: tagsArr[i],
                                })
                                .returning("id");
                            // console.log("tagsId", tagsId);
                            databaseTagsArr.push(tagsId[0]);
                        }
                    }
                    // console.log("databaseTagsArr:", databaseTagsArr);
                    for (let i = 0; i < databaseTagsArr.length; i++) {
                        await txn("post_tags").insert({
                            post_id: postId[0].id,
                            tag_id: databaseTagsArr[i].id,
                        });
                    }
                    databaseTagsArr = [];
                }
            }
            await txn.commit();
            return { success: true };
        } catch (error) {
            await txn.rollback();
            winstonLogger.error(error.toString());
            return { success: false };
        }
    }
    async postDetailByPostId(postId: string, userId: string) {
        try {
            const allPost = (
                await this.knex.raw(
                    `
                SELECT posts.id ,
                posts.title,
                posts.event_date,
                posts.event_time,
                posts.event_location,
                posts.description,
                posts.contact,
                posts.created_at,
                posts.updated_at,
                posts.is_ordinary,
                posts.is_event,
                posts.display_push,
                users.account_name,
                json_agg(DISTINCT users.icon) icon,
                json_agg(DISTINCT post_images.image) image,
                json_agg(DISTINCT tags.tag) tag,
                post_likes.like_by_user_id = ? AS is_liked_by_user,
                users.id AS user_id,
                COUNT(post_likes.id)
            FROM posts
                LEFT JOIN users ON users.id = posts.user_id
                LEFT JOIN post_images ON post_images.post_id = posts.id
                LEFT JOIN post_tags ON post_tags.post_id = posts.id
                LEFT JOIN tags ON tags.id = post_tags.tag_id
                LEFT JOIN post_likes ON post_likes.post_id = posts.id
            WHERE posts.id = ?
            GROUP BY (users.id,posts.id, users.account_name,post_likes.like_by_user_id)
            ORDER BY posts.display_push DESC;
                        `,
                    [userId, postId]
                )
            ).rows[0];

            console.log("allPost:", allPost);
            return allPost;
        } catch (error) {
            winstonLogger.error(error.toString());
            return;
        }
    }
    async reportPost() {}
}
