import express from "express";
import { accountController } from "../server";
import { isLoggedIn } from "../utils/isLoggedInGuard";
import middlewareLogger from "../utils/middlewareLogger";
import { asyncWrapper } from "../utils/wrapper";

export const accountRoutes = express.Router();

accountRoutes.get("/userDataJWT", isLoggedIn, accountController.getSelfInfo);
accountRoutes.post("/logIn", middlewareLogger, asyncWrapper(accountController.logIn));
accountRoutes.post("/signUp", accountController.signUp);
