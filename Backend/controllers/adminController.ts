import { Request, Response } from "express";
import { AdminService } from "../services/adminService";

export class AdminController {
    constructor(private adminService: AdminService) {}

    getReportedUser = async (req: Request, res: Response) => {
        //get user data & complaint reason
    };
    changeUsersAccess = async (req: Request, res: Response) => {};
    getAllProduct = async (req: Request, res: Response) => {};
    createProduct = async (req: Request, res: Response) => {};
    deleteProduct = async (req: Request, res: Response) => {};
    editProduct = async (req: Request, res: Response) => {};
    deleteProductSize = async (req: Request, res: Response) => {};
    searchProduct = async (req: Request, res: Response) => {};
    getAllOrder = async (req: Request, res: Response) => {};
    shipping = async (req: Request, res: Response) => {};
    addPost = async (req: Request, res: Response) => {};
    editPost = async (req: Request, res: Response) => {};
    getAdminPost = async (req: Request, res: Response) => {};
    deleteAdminPost = async (req: Request, res: Response) => {};
    getReportedPost = async (req: Request, res: Response) => {};
    deleteUserPost = async (req: Request, res: Response) => {};
    createBanner = async (req: Request, res: Response) => {};
    getAllBanner = async (req: Request, res: Response) => {};
}
