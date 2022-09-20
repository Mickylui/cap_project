import express from "express";
import { postController } from "../server";
import middlewareLogger from "../utils/middlewareLogger";
import { formidableMiddleware } from "../utils/formidableMiddleware";

export const postRoutes = express.Router();

postRoutes.get("/", middlewareLogger, postController.getPosts);
postRoutes.post("/addPost", formidableMiddleware, postController.addPost);
postRoutes.get("/getSearchTagPost", middlewareLogger, postController.getSearchTagPost);
postRoutes.get("/getPostDetailByPostIdFetch", middlewareLogger, postController.postDetailByPostId);
