import express from "express";
import { accountController } from "../server";
import { isLoggedIn } from "../utils/isLoggedInGuard";
// import middlewareLogger from "../utils/middlewareLogger";

export const accountRoutes = express.Router();

accountRoutes.get("/userDataJWT",isLoggedIn,accountController.getSelfInfo)
accountRoutes.post("/logIn",accountController.logIn)
accountRoutes.post("/signUp",accountController.signUp)