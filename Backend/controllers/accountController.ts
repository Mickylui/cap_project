import { Request, Response } from "express";
import { AccountService } from "../services/accountService";
import { hashPassword } from "../utils/hash";

export class AccountController {
    constructor(private accountService: AccountService) {}
    signUp = async (req: Request, res: Response) => {
        const { accountName, email, password } = req.body;
        const hashedPassword = await hashPassword(password)
        console.log("(AccountController)this is accountName:", accountName)
        console.log("(AccountController)this is email:", email)
        console.log("(AccountController)this is password:", hashedPassword)
        const result = await this.accountService.signUp(accountName, email, hashedPassword)
        if(result["success"] === false){
            res.status(400).json(result["message"]);
            return
        }
        res.status(200).json(result["body"]);
        console.log("this is result from accountService login:", result)
    };
    logIn = async (req: Request, res: Response) => {
        const {email,password} = req.body;
        // console.log("this is email:", email)
        // console.log("this is password:", password)
        const result = await this.accountService.logIn(email,password)
        console.log("this is result from accountService login:", result)
    };
    logOut = async (req: Request, res: Response) => {};
}
