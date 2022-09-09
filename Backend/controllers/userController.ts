import { Request, Response } from "express";
import { UserService } from "../services/userService";

export class UserController {
    constructor(private userService: UserService) {}

    getAllPost = async (req: Request, res: Response) => {};
    editPost = async (req: Request, res: Response) => {};
    deletePost = async (req: Request, res: Response) => {};
    // changePostOrder(){}
    getAllLikePost = async (req: Request, res: Response) => {};
    getOrderData = async (req: Request, res: Response) => {};
    editOrder = async (req: Request, res: Response) => {};
    deleteOrder = async (req: Request, res: Response) => {};
    payment = async (req: Request, res: Response) => {
        //Don't use point
        //Use point
    };
    getUserInfo = async (req: Request, res: Response) => {};
    editUserInfo = async (req: Request, res: Response) => {};
    reportUser = async (req: Request, res: Response) => {};
}
