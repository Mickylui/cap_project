import express from "express";
import { accountController } from "../server";
import { isLoggedInGuard } from "../utils/isLoggedInGuard";
import middlewareLogger from "../utils/middlewareLogger";

export const accountRoutes = express.Router();

accountRoutes.post("/logIn",accountController.logIn)
accountRoutes.post("/signUp",accountController.signUp)
accountRoutes.get("/userDataJWT",middlewareLogger,isLoggedInGuard,accountController.userDataJWT)