import { Request, Response } from "express";
import { UserService } from "../services/userService";

export class UserController {
    constructor(private userService: UserService) {}

    getUserPost = async (req: Request, res: Response) => {
        try {
            const userId = req.params;
            console.log("userId:", userId);
            const getUserPostResult = await this.userService.getUserPost(userId);
            if (getUserPostResult) {
                res.status(200).json({ success: true, body: getUserPostResult });
            }
        } catch (error) {
            res.status(500).json({ success: true, message: "Internal Server Error" });
        }
    };
    getAllLikePost = async (req: Request, res: Response) => {
        try {
            const userId = req.params;
            console.log("userId:", userId);
            const getUserPostResult = await this.userService.getAllLikePost(userId);
            if (getUserPostResult) {
                res.status(200).json({ success: true, body: getUserPostResult });
            }
        } catch (error) {
            res.status(500).json({ success: true, message: "Internal Server Error" });
        }
    };
    editPost = async (req: Request, res: Response) => {};
    deletePost = async (req: Request, res: Response) => {};
    // changePostOrder(){}
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
