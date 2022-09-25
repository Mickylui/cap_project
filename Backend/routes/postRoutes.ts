import express from "express";
import { postController } from "../server";
import middlewareLogger from "../utils/middlewareLogger";
import { formidableMiddleware } from "../utils/formidableMiddleware";

export const postRoutes = express.Router();

postRoutes.get("/",middlewareLogger, postController.getPosts);
postRoutes.post("/addPost", middlewareLogger,formidableMiddleware, postController.addPost);
postRoutes.get("/getSearchTagPost", middlewareLogger, postController.getSearchTagPost);
postRoutes.get("/getPostDetailByPostId", middlewareLogger, postController.postDetailByPostId);
postRoutes.get("/getSearchContentPost", middlewareLogger, postController.searchContentPost);
postRoutes.get("/changeLike", middlewareLogger, postController.changeLikeStatus);
