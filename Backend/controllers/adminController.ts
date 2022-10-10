import { Request, Response } from "express";
import { AdminService } from "../services/adminService";
import { winstonLogger } from "../utils/winstonLogger";

export class AdminController {
    constructor(private adminService: AdminService) {}

    // getReportedUser = async (req: Request, res: Response) => {
    //     //get user data & complaint reason
    // };
    // changeUsersAccess = async (req: Request, res: Response) => {};
    // getAllProduct = async (req: Request, res: Response) => {};
    // createProduct = async (req: Request, res: Response) => {};
    // deleteProduct = async (req: Request, res: Response) => {};
    // editProduct = async (req: Request, res: Response) => {};
    // deleteProductSize = async (req: Request, res: Response) => {};
    // searchProduct = async (req: Request, res: Response) => {};
    getOrder = async (req: Request, res: Response) => {
        try {
            const getOrderResp = await this.adminService.getOrder();
            console.log("getOrderResp:", getOrderResp);
            if (getOrderResp) {
                return res.status(200).json({ success: true, body: getOrderResp });
            }
            return res.status(400).json({ success: false, message: "Failed to get data" });
        } catch (error) {
            winstonLogger.error(error.toString());
            return res.status(500).json({ success: false, message: "Internal Server Error" });
        }
    };
    shipping = async (req: Request, res: Response) => {
        try {
            // params
            const orderId = req.query.orderId as string;
            const shippingResp = (await this.adminService.shipping(orderId)) as [];
            if (shippingResp) {
                return res.status(200).json({ success: true });
            }
            return res.status(400).json({ success: false, message: "Failed to ship order" });
        } catch (error) {
            winstonLogger.error(error.toString());
            return res.status(500).json({ success: false, message: "Internal Server Error" });
        }
    };

    cancelOrder = async (req: Request, res: Response) => {
        try {
            const orderId = req.query.orderId as string;
            const cancelOrderResp = (await this.adminService.cancel(orderId)) as [];
            if (cancelOrderResp) {
                return res.status(200).json({ success: true });
            }
            return res.status(400).json({ success: false, message: "Failed to ship order" });
        } catch (error) {
            winstonLogger.error(error.toString());
            return res.status(500).json({ success: false, message: "Internal Server Error" });
        }
    };
    // addPost = async (req: Request, res: Response) => {};
    // editPost = async (req: Request, res: Response) => {};
    // getAdminPost = async (req: Request, res: Response) => {};
    // deleteAdminPost = async (req: Request, res: Response) => {};
    // getReportedPost = async (req: Request, res: Response) => {};
    // deleteUserPost = async (req: Request, res: Response) => {};
    // createBanner = async (req: Request, res: Response) => {};
    // getAllBanner = async (req: Request, res: Response) => {};
}
