import { Request, Response, NextFunction } from "express";
import { Bearer } from "permit";
import jwtSimple from "jwt-simple";
import jwt from "../jwt";
import { winstonLogger } from "./winstonLogger";
import { accountService } from "../server";

const permit = new Bearer({
    query: "access_token",
});

export async function isLoggedIn(req: Request, res: Response, next: NextFunction) {
    try {
        const token = permit.check(req);
        // console.log("isLoggedIn:",token)
        if (!token) {
            return res.status(401).json({ message: "Permission Denied" });
        }
        const payload = jwtSimple.decode(token, jwt.jwtSecret);
        const result = await accountService.userDataJWT(payload.id);
        if (result["success"] === true) {
            const { password, ...others } = result.body?.combineUserData[0];
            req.body.user = { ...others };
            req.body.shoppingCartArr = result.body?.userShoppingDataArr;
            return next();
        } else {
            return res.status(401).json({ message: "Permission Denied" });
        }
    } catch (err) {
        winstonLogger.error(err.message);
        return res.status(401).json({ message: "Permission Denied" });
    }
}
