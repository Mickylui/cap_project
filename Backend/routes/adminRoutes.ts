import express from "express";
import { adminController } from "../server";
import middlewareLogger from "../utils/middlewareLogger";
// import { formidableMiddleware } from "../utils/formidableMiddleware";

export const adminRoutes = express.Router();

adminRoutes.get("/getOrder", middlewareLogger, adminController.getOrder);
