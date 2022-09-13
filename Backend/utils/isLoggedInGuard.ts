import { Request, Response, NextFunction } from "express";
import {Bearer} from 'permit';
import jwtSimple from 'jwt-simple';
import jwt from "../jwt";

const permit = new Bearer({
    query: "access_token"
})

export async function isLoggedInGuard(req: Request, res: Response, next: NextFunction) {
    try{
        const token = permit.check(req);
        // no token -> never login
        if(!token){
            return res.status(401).json({message:"Permission Denied"});
        }else{
            // has token && has record of this user -> success: loggedIn before
            // has req.session["user"] -> success: status--still loggedIn
            const payload = jwtSimple.decode(token, jwt.jwtSecret);

            const checkUserIdentity = req.session["user"];
            if (!checkUserIdentity) {
                console.log("isLoggedInMiddleware - fails");
                res.redirect("/login");
                return;
            }
            console.log("isLoggedInMiddleware - success");
            next();
        }
    }catch(e){

    }
}
