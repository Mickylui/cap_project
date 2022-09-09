import { Request, Response } from "express";
import { PostService } from "../services/postService";

export class PostController {
    constructor(private postService: PostService){}
    
}
