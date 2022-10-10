import express from "express";
import { userController } from "../server";
import middlewareLogger from "../utils/middlewareLogger";

export const userRoutes = express.Router();

userRoutes.get("/getUserPost/:userId", middlewareLogger, userController.getUserPost);
userRoutes.get("/getUserLikePost/:userId", middlewareLogger, userController.getAllLikePost);
