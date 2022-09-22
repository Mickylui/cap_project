import { Request, Response } from "express";
import { PostService } from "../services/postService";
import { winstonLogger } from "../utils/winstonLogger";

export class PostController {
    constructor(private postService: PostService) {}
    getPosts = async (req: Request, res: Response) => {
        try {
            const userId = req.query.userId as string;
            // console.log("getPosts:", userId);
            const allPostData = await this.postService.getAllPost(userId);
            res.status(200).json({ success: true, body: allPostData });
        } catch (error) {
            winstonLogger.error(error.toString());
            res.status(500).json({ success: false, message: "Internal Server Error" });
        }
    };
    postDetailByPostId = async (req: Request, res: Response) => {
        try {
            const postId = req.query.postId as string;
            const userId = req.query.userId as string;
            const getPostDetailByPostIdData = await this.postService.postDetailByPostId(
                postId,
                userId
            );

            res.status(200).json({ success: true, body: getPostDetailByPostIdData });
        } catch (error) {
            winstonLogger.error(error.toString());
            res.status(500).json({ success: false, message: "Internal Server Error" });
        }
    };
    getSearchTagPost = async (req: Request, res: Response) => {
        try {
            const tag = req.query.tag as string;
            const userId = req.query.userId as string;
            // console.log("getSearchTagPost!", tag);
            const allPostData = await this.postService.getSearchTagPost(tag, userId);
            res.status(200).json({ success: true, body: allPostData });
        } catch (error) {
            winstonLogger.error(error.toString());
            res.status(500).json({ success: false, message: "Internal Server Error" });
        }
    };
    searchContentPost = async (req: Request, res: Response) => {
        try {
            const keyword = req.query.keyword as string;
            const userId = req.query.userId as string;
            // console.log("getSearchContentPost!", keyword);
            const allPostData = await this.postService.contentPost(keyword, userId);
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
            // console.log("addPostResult:", addPostResult);
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
