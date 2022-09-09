import { Request, Response } from "express";
import { AccountService } from "../services/accountService";

export class AccountController {
    constructor(private accountService: AccountService) {}
    signUp = async (req: Request, res: Response) => {};
    logIn = async (req: Request, res: Response) => {};
    logOut = async (req: Request, res: Response) => {};
}
