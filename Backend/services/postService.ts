import { Knex } from "knex";
import { winstonLogger } from "../utils/winstonLogger";

export class PostService {
    constructor(private knex: Knex) {}
    async getAllPost() {
        try {
            const allPost = await this.knex("posts")
                .select(
                    "posts.id",
                    "posts.title",
                    "posts.event_date",
                    "posts.event_time",
                    "posts.event_location",
                    "posts.description",
                    "posts.description",
                    "posts.description",
                    "posts.description",
                    "posts.description",
                    "posts.description",
                    "posts.description",
                    "users.account_name",
                    "post_images.image",
                    "tags.tag"
                )
                .leftJoin("users", "users.id", "posts.user_id")
                .leftJoin("post_images", "post_images.post_id", "posts.id")
                .leftJoin("post_tags", "post_tags.post_id", "posts.id")
                .leftJoin("tags", "tags.id", "post_tags.tag_id").orderBy("display_push","desc")
            console.log("allPost:", allPost);
            return allPost;
        } catch (error) {
            winstonLogger.error(error.toString());
            return;
        }
    }
    async searchPost() {
        //search content or tag (multiple?)
        //click tag
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
            const isAdmin = await txn("users")
                .select("is_admin")
                .where("id", parseInt(fields.user_id));
            let databaseTagsArr = [];
            // if field.isEventPost false
            // console.log("isEventPost:", fields.isEventPost);
            if (fields.isEventPost === "false") {
                if (isAdmin) {
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
                if (isAdmin) {
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
    async likePost() {}
    async reportPost() {}
}
