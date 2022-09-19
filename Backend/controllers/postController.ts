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
            const form = req.form;
            const fields = form.fields;
            const files = form.files.files;

            const addPostResult = await this.postService.addPost(fields, files);
            console.log("addPostResult:", addPostResult);
            if (addPostResult?.success) {
                res.status(200).json({ success: true });
            } else {
                res.status(400).json({ success: false, message: "Failed to insert" });
            }

            // console.log("this is fields:", fields);
            // console.log("this is file:", files);
        } catch (error) {
            winstonLogger.error(error.toString());
            res.status(500).json({ success: false, message: "Internal Server Error" });
        }
    };
}
