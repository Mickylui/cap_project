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
                .leftJoin("tags", "tags.id", "post_tags.tag_id");
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
    async addPost(fields: {}, files: []) {
        // const txn = await this.knex.transaction();

        console.log("fields:", fields);
        console.log("files:", files);

        try {
            // if field.isEventPost false
            // const insertPostResp = await txn("posts").insert({
            //     user_id: fields.user_id,
            //     title: fields.title,
            //     description: fields.description,
            // });
            // if field.isEventPost true
        } catch (error) {}
    }
    async likePost() {}
    async reportPost() {}
}
