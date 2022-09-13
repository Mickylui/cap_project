import express from "express";
import { accountController } from "../server";
// import middlewareLogger from "../utils/middlewareLogger";

export const accountRoutes = express.Router();

accountRoutes.post("/logIn",accountController.logIn)
accountRoutes.post("/signUp",accountController.signUp)