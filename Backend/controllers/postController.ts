import { Request, Response } from "express";
import { PostService } from "../services/postService";
import { winstonLogger } from "../utils/winstonLogger";

export class PostController {
    constructor(private postService: PostService) {}
    getPosts = async (req: Request, res: Response) => {
        try {
            const allPostData = await this.postService.getAllPost();
            res.status(200).json({ success: true, body: allPostData });
        } catch (error) {
            winstonLogger.error(error.toString());
            res.status(500).json({ success: false, message: "Internal Server Error" });
        }
    };
    addPost = async (req: any, res: Response) => {
        try {
            console.log("this is addPost:", req.form)
            console.log("this is form:", req.form)
        } catch (error) {
            winstonLogger.error(error.toString());
            res.status(500).json({ success: false, message: "Internal Server Error" });
        }
    };
}
