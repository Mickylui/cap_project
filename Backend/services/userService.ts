import { Knex } from "knex";
import { winstonLogger } from "../utils/winstonLogger";
export class UserService {
    constructor(private knex: Knex) {}

    async getUserPost(userId: any) {
        try {
            const allPost = (
                await this.knex.raw(
                    `
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
                WHERE posts.user_id = ?
                GROUP BY (posts.id, users.account_name)
                ORDER BY posts.created_at DESC
                        `,
                    [userId.userId, userId.userId]
                )
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
                posts.is_delete,
                posts.user_id,
                users.account_name,
                json_agg(DISTINCT post_images.image) image,
                json_agg(DISTINCT tags.tag) tag,
                COUNT(DISTINCT post_likes.id)
            FROM posts
                LEFT JOIN users ON users.id = posts.user_id
                LEFT JOIN post_images ON post_images.post_id = posts.id
                LEFT JOIN post_tags ON post_tags.post_id = posts.id
                LEFT JOIN tags ON tags.id = post_tags.tag_id
                LEFT JOIN post_likes ON post_likes.post_id = posts.id
            WHERE post_likes.like_by_user_id = ?
            AND post_likes.is_dislike = false
            GROUP BY (posts.id, users.account_name)
            ORDER BY post_likes.like_at DESC
                        `,
                    [userId.userId]
                )
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
    async getUserInfo(userId: string) {
        const txn = await this.knex.transaction();
        try {
            // console.log("tokenId:", tokenId);
            const combineUserData = await txn("users")
                .select(
                    "users.id",
                    "users.account_name",
                    "users.email",
                    "users.is_admin",
                    "users.created_at",
                    "users.updated_at",
                    "users.last_login_at",
                    "users.default_contact",
                    "user_info.first_name",
                    "user_info.last_name",
                    "users.icon",
                    "users.slogan",
                    "user_info.area",
                    "user_info.district",
                    "user_info.location",
                    "user_info.contact",
                    "user_info.gender",
                    "user_info.age_range",
                    "user_info.reason",
                    "user_info.learning_level"
                )
                .leftJoin("user_info", "user_info.user_id", "users.id")
                .where("users.id", userId);
            // console.log("combineUserData:", combineUserData);

            await txn.commit();
            return { success: true, body: { combineUserData } };
        } catch (error) {
            await txn.rollback();
            winstonLogger.error(error.toString());
            return { success: false, message: "Internal Server Error" };
        }
    }
    async editUserInfo() {}
    async reportUser() {}
}
