import { Knex } from "knex";
// import { winstonLogger } from "../utils/winstonLogger";

export class PostService {
    constructor(private knex: Knex) {}
    async getAllPost() {
        const allPost = await this.knex("posts").select("*")
        return allPost
    }
    async searchPost() {
        //search content or tag (multiple?)
        //click tag
    }
    async addPost() {}
    async likePost() {}
    async reportPost() {}
}
