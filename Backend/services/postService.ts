import { Knex } from "knex";
import { winstonLogger } from "../utils/winstonLogger";

export class PostService {
    constructor(private knex: Knex) {}
    async getUserPost(userId: string, page: number, limit: number) {
        const offset = (page - 1) * limit;
        console.log("getUsersPost userId", userId);
        console.log("getUsersPost page", page);
        console.log("getUsersPost limit", limit);
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
                    posts.user_id,
                    users.account_name,
                    json_agg(DISTINCT users.icon) icon,
                    json_agg(DISTINCT post_images.image) image,
                    json_agg(DISTINCT tags.tag) tag,
                    json_agg(DISTINCT post_likes.like_by_user_id = ?) AS is_liked_by_user,
                    COUNT(DISTINCT post_likes.id)
                FROM posts
                    LEFT JOIN users ON users.id = posts.user_id
                    LEFT JOIN post_images ON post_images.post_id = posts.id
                    LEFT JOIN post_tags ON post_tags.post_id = posts.id
                    LEFT JOIN tags ON tags.id = post_tags.tag_id
                    LEFT JOIN post_likes ON post_likes.post_id = posts.id
                WHERE posts.is_delete = false
                AND posts.is_ordinary = false
                GROUP BY (
                        posts.id,
                        users.account_name
                    )
                ORDER BY posts.display_push DESC, posts.id
                LIMIT ? OFFSET ?;
                        `,
                    [userId, limit, offset]
                )
            ).rows;

            // console.log("allPost:", allPost);
            return allPost;
        } catch (error) {
            winstonLogger.error(error);
            return;
        }
    }
    async getAdminPost(userId: string) {
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
                    posts.user_id,
                    users.account_name,
                    json_agg(DISTINCT users.icon) icon,
                    json_agg(DISTINCT post_images.image) image,
                    json_agg(DISTINCT tags.tag) tag,
                    json_agg(DISTINCT post_likes.like_by_user_id = ?) AS is_liked_by_user,
                    COUNT(DISTINCT post_likes.id)
                FROM posts
                    LEFT JOIN users ON users.id = posts.user_id
                    LEFT JOIN post_images ON post_images.post_id = posts.id
                    LEFT JOIN post_tags ON post_tags.post_id = posts.id
                    LEFT JOIN tags ON tags.id = post_tags.tag_id
                    LEFT JOIN post_likes ON post_likes.post_id = posts.id
                WHERE posts.is_delete = false
                AND posts.is_ordinary = true
                GROUP BY (
                        posts.id,
                        users.account_name
                    )
                ORDER BY posts.display_push DESC, posts.id
                        `,
                    [userId]
                )
            ).rows;

            return allPost;
        } catch (error) {
            winstonLogger.error(error);
            return;
        }
    }
    async getSearchTagPost(tag: string, userId: string) {
        try {
            console.log("tag:",tag)
            console.log("userId:",userId)
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
                    posts.user_id,
                    users.account_name,
                    json_agg(DISTINCT users.icon) icon,
                    json_agg(DISTINCT post_images.image) image,
                    json_agg(DISTINCT tmp.tag) tag,
                    json_agg(DISTINCT post_likes.like_by_user_id = ?) AS is_liked_by_user,
                    COUNT(DISTINCT post_likes.id)
                FROM posts
                    LEFT JOIN users ON users.id = posts.user_id
                    LEFT JOIN post_images ON post_images.post_id = posts.id
                    LEFT JOIN post_tags ON post_tags.post_id = posts.id
                    RIGHT JOIN tmp ON tmp.id = post_tags.tag_id
                    LEFT JOIN post_likes ON post_likes.post_id = posts.id
                WHERE posts.is_delete = false
                GROUP BY (posts.id, users.account_name)
                ORDER BY posts.display_push DESC, posts.id
                        `,
                    [tag, userId]
                )
            ).rows;

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
                    posts.user_id,
                    users.account_name,
                    json_agg(DISTINCT users.icon) icon,
                    json_agg(DISTINCT post_images.image) image,
                    json_agg(DISTINCT tags.tag) tag,
                    json_agg(DISTINCT post_likes.like_by_user_id = ?) AS is_liked_by_user,
                    COUNT(DISTINCT post_likes.id)
                FROM posts
                    LEFT JOIN users ON users.id = posts.user_id
                    LEFT JOIN post_images ON post_images.post_id = posts.id
                    LEFT JOIN post_tags ON post_tags.post_id = posts.id
                    LEFT JOIN tags ON tags.id = post_tags.tag_id
                    LEFT JOIN post_likes ON post_likes.post_id = posts.id
                WHERE posts.description LIKE ?
                OR tags.tag LIKE ?
                AND posts.is_delete = false
                GROUP BY (
                        posts.id,
                        users.account_name
                    )
                ORDER BY posts.display_push DESC, posts.id
                        `,
                    [userId, `%%${keyword}%%`,`%%${keyword}%%`]
                )
            ).rows;

            console.log("getSearchContentPost:", allPost);
            return allPost;
        } catch (error) {
            winstonLogger.error(error.toString());
            return;
        }
    }
    async addPost(fields: any, files: any) {
        const txn = await this.knex.transaction();
        const tagsArr = fields.tagItems.split(",");

        console.log("fields:", fields);
        console.log("files Service:", files);
        // console.log("tagsArr:", tagsArr);

        let imageFiles = [];
        if (files === undefined) {
            imageFiles = [];
        } else {
            console.log("have file");
            console.log("files.lenght:", files.length);
            if (files.length > 1) {
                imageFiles = files;
                console.log("have multiple file");
            } else {
                imageFiles.push(files);
            }
        }
        console.log("imageFiles:", imageFiles);
        try {
            const isAdmin: object = await txn("users")
                .select("is_admin")
                .where(this.knex.raw("id = ?", parseInt(fields.user_id)));
            // .where("id", parseInt(fields.user_id));
            // console.log("isAdmin", isAdmin);
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
                        // console.log("exitTags:", exitTags);
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
                    console.log("postId:", postId);

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
                    console.log("imageFiles:", imageFiles);

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
            console.log("postDetailByPostId userId", userId);
            console.log("postDetailByPostId postId", postId);
            // console.log("countLike:", countLike);
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
                    posts.user_id,
                    users.account_name,
                    json_agg(DISTINCT users.icon) icon,
                    json_agg(DISTINCT post_images.image) image,
                    json_agg(DISTINCT tags.tag) tag,
                    json_agg(DISTINCT post_likes.like_by_user_id = ?) AS is_liked_by_user,
                    users.id AS user_id,
                    COUNT(DISTINCT post_likes.id)
                FROM posts
                    LEFT JOIN users ON users.id = posts.user_id
                    LEFT JOIN post_images ON post_images.post_id = posts.id
                    LEFT JOIN post_tags ON post_tags.post_id = posts.id
                    LEFT JOIN tags ON tags.id = post_tags.tag_id
                    LEFT JOIN post_likes ON post_likes.post_id = posts.id
                WHERE posts.id = ?
                    AND posts.is_delete = false
                GROUP BY (users.id, posts.id, users.account_name)
                ORDER BY posts.display_push DESC;
                        `,
                    [userId, postId]
                )
            ).rows[0];
            return allPost;
        } catch (error) {
            winstonLogger.error(error.toString());
            return;
        }
    }
    async likePost(postId: string, userId: string) {
        const txn = await this.knex.transaction();
        try {
            console.log("likePost userId", userId);
            console.log("likePost postId", postId);
            const insertLikeResult = await txn("post_likes")
                .insert({
                    like_by_user_id: userId,
                    post_id: postId,
                    like_at: this.knex.fn.now(),
                })
                .returning("*");
            console.log("insertLikeResult:", insertLikeResult);
            // }
            await txn.commit();
            return true;
        } catch (error) {
            await txn.rollback();
            winstonLogger.error(error.toString());
            return;
        }
    }
    async dislikePost(postId: string, userId: string) {
        const txn = await this.knex.transaction();
        try {
            console.log("dislikePost userId", userId);
            console.log("dislikePost postId", postId);
            const updatedLikeResult = await txn("post_likes")
                .del()
                .where("post_id", postId)
                .andWhere("like_by_user_id", userId)
                .returning("*");
            console.log("delete:", updatedLikeResult);
            await txn.commit();
            return updatedLikeResult;
        } catch (error) {
            await txn.rollback();
            winstonLogger.error(error.toString());
            return;
        }
    }
    async reportPost() {}
}


