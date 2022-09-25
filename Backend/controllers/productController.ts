import { Request, Response } from "express";
import { ProductService } from "../services/productService";
import { winstonLogger } from "../utils/winstonLogger";

export class ProductController {
    constructor(private productService: ProductService) {}
    getProducts = async (req: Request, res: Response) => {
        try {
            const allProductData = await this.productService.getAllProduct();
            res.status(200).json({ success: true, body: allProductData });
        } catch (error) {
            winstonLogger.error(error.toString());
            res.status(500).json({ success: false, message: "Internal Server Error" });
        }
    };

    productDetailByProductId = async (req: Request, res: Response) => {
        try {
            const productId = req.query.productId as string;
            console.log("productId:", productId);
            const getProductDetailByProductIdData =
                await this.productService.productDetailByProductId(productId);

            res.status(200).json({ success: true, body: getProductDetailByProductIdData });
        } catch (error) {
            winstonLogger.error(error.toString());
            res.status(500).json({ success: false, message: "Internal Server Error" });
        }
    };
    addProduct = async (req: any, res: Response) => {
        try {
            console.log("this is addProduct:", req.form);
            console.log("this is form:", req.form);
        } catch (error) {
            winstonLogger.error(error.toString());
            res.status(500).json({ success: false, message: "Internal Server Error" });
        }
    };
    // deleteProduct = async (req: any, res: Response) => {
    //     try {
    //         const id = req.params.id;
    //         await this.productService.deleteProduct(id)
    //     } catch (error) {
    //         winstonLogger.error(error.toString());
    //         res.status(500).json({ success: false, message: "Internal Server Error" });
    //     }
    // };

    getAllCartItems = async (req: Request, res: Response) => {
        try {
            const userId = req.body.user.id;
            const allCartItemsData = await this.productService.getAllCartItems(userId);
            res.status(200).json({ success: true, body: allCartItemsData });
        } catch (error) {
            winstonLogger.error(error.toString());
            res.status(500).json({ success: false, message: "Internal Server Error" });
        }
    };
    addToCart = async (req: Request, res: Response) => {
        try {
            const userId = req.body.user.id;
            const { product_id, size, quantity } = req.body.item; // { product_id, size, quantity }
            const result = await this.productService.addToCart(userId, product_id, size, quantity);
            res.json(result);
        } catch (error) {
            winstonLogger.error(error.toString());
            res.status(500).json({ success: false, message: "Internal Server Error" });
        }
    };

    removeCartItem = async (req: Request, res: Response) => {
        try {
            console.log("remove controller !", req.body);
            const strId = req.body.product_id;
            const id = parseInt(strId as string);
            await this.productService.RemoveCartItem(id);
            console.log(id);
        } catch (error) {
            winstonLogger.error(error.toString());
            res.status(500).json({ success: false, message: "Internal Server Error" });
        }
    };
}
