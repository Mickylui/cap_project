import { Request, Response } from "express";
import { AccountService } from "../services/accountService";
import { InvalidParamError } from "../utils/errors";
import { hashPassword } from "../utils/hash";
import { winstonLogger } from "../utils/winstonLogger";

export class AccountController {
    constructor(private accountService: AccountService) {}

    signUp = async (req: Request, res: Response) => {
        try {
            const { accountName, email, password } = req.body;
            const hashedPassword = await hashPassword(password);
            const result = await this.accountService.signUp(accountName, email, hashedPassword);
            if (!result["success"]) {
                res.status(400).json(result);
                return;
            }
            res.status(200).json(result);
        } catch (error) {
            winstonLogger.error(error.toString());
            res.status(500).json({ success: false, message: "Internal Server Error" });
        }
    };

    logIn = async (req: Request, res: Response) => {
        const { email, password } = req.body;
        if (!email || !password) {
            throw new InvalidParamError();
        }
        const result = await this.accountService.logIn(email, password);
        if (!result["success"]) {
            res.status(400).json(result);
            return;
        }
        res.status(200).json(result);
    };

    getSelfInfo = async (req: Request, res: Response) => {
        try {
            const user = req.body.user;
            const shoppingCartArr = req.body.shoppingCartArr;

            // console.log("this is getSelfInfo:", user);
            res.json({ body: { combineUserData: user, userShoppingDataArr: shoppingCartArr } });
        } catch (error) {
            winstonLogger.error(error.toString());
            res.status(500).json({ success: false, message: "Internal Server Error" });
        }
    };
}
