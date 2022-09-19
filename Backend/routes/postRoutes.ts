import express from "express";
import { postController } from "../server";
// import middlewareLogger from "../utils/middlewareLogger";
import { formidableMiddleware } from "../utils/formidableMiddleware";

export const postRoutes = express.Router();

postRoutes.get("/", postController.getPosts);
postRoutes.post("/addPost", formidableMiddleware, postController.addPost);
