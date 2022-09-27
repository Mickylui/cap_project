import express from "express";
import { postController } from "../server";
import middlewareLogger from "../utils/middlewareLogger";
import { formidableMiddleware } from "../utils/formidableMiddleware";
import { isLoggedIn } from "../utils/isLoggedInGuard";

export const postRoutes = express.Router();

// postRoutes.get("/", middlewareLogger, postController.getAllPosts);
postRoutes.get("/userPost", middlewareLogger, isLoggedIn, postController.getUserPosts);
postRoutes.get("/adminPost", middlewareLogger, isLoggedIn, postController.adminPost);
postRoutes.post("/addPost", middlewareLogger, formidableMiddleware, postController.addPost);
postRoutes.get("/getSearchTagPost", middlewareLogger, isLoggedIn, postController.getSearchTagPost);
postRoutes.get(
    "/getPostDetailByPostId",
    middlewareLogger,
    isLoggedIn,
    postController.postDetailByPostId
);
postRoutes.get(
    "/getSearchContentPost",
    middlewareLogger,
    isLoggedIn,
    postController.searchContentPost
);
postRoutes.get("/likePost", middlewareLogger, postController.likePost);
postRoutes.get("/dislikePost", middlewareLogger, postController.dislikePost);
