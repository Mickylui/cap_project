import { Knex } from "knex";
import { winstonLogger } from "../utils/winstonLogger";
export class UserService {
    constructor(private knex: Knex) {}

    async getUserPost(userId: any) {
        try {
            const allPost = (
                await this.knex.raw(`
                SELECT  posts.id,
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
                        posts.is_delete,
                        users.account_name,
                        json_agg(DISTINCT post_images.image) image,
                        json_agg(DISTINCT tags.tag) tag,
                        json_agg(DISTINCT post_likes.like_by_user_id = ?) AS is_liked_by_user,
                        COUNT(post_likes.id)
                FROM posts
                    LEFT JOIN users ON users.id = posts.user_id
                    LEFT JOIN post_images ON post_images.post_id = posts.id
                    LEFT JOIN post_tags ON post_tags.post_id = posts.id
                    LEFT JOIN tags ON tags.id = post_tags.tag_id
                    LEFT JOIN post_likes ON post_likes.post_id = posts.id
                WHERE posts.user_id = ?
                GROUP BY (posts.id, users.account_name)
                ORDER BY posts.display_push DESC
                        `,[userId.userId,userId.userId])
            ).rows;
            console.log("getUserPost:", allPost);
            return allPost;
        } catch (error) {
            winstonLogger.error(error.toString());
            return;
        }
    }
    async getAllLikePost(userId: any) {
        try {
            const allPost = (
                await this.knex.raw(`
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
                posts.is_delete,
                users.account_name,
                json_agg(DISTINCT post_images.image) image,
                json_agg(DISTINCT tags.tag) tag,
                COUNT(post_likes.id)
            FROM posts
                LEFT JOIN users ON users.id = posts.user_id
                LEFT JOIN post_images ON post_images.post_id = posts.id
                LEFT JOIN post_tags ON post_tags.post_id = posts.id
                LEFT JOIN tags ON tags.id = post_tags.tag_id
                LEFT JOIN post_likes ON post_likes.post_id = posts.id
            WHERE post_likes.like_by_user_id = ?
            GROUP BY (posts.id, users.account_name)
            ORDER BY posts.display_push DESC
                        `,[userId.userId])
            ).rows;
            // console.log("getUserPost:", allPost);
            return allPost;
        } catch (error) {
            winstonLogger.error(error.toString());
            return;
        }
    }
    async editPost() {}
    async deletePost() {}
    // changePostOrder(){}
    async getOrderData() {}
    async editOrder() {}
    async deleteOrder() {}
    async payment() {
        //Don't use point
        //Use point
    }
    async getUserInfo() {}
    async editUserInfo() {}
    async reportUser() {}
}
