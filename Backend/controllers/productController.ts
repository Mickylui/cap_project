import { Request, Response } from "express";
import { ProductService } from "../services/productService";
import { winstonLogger } from "../utils/winstonLogger";

export class ProductController {
    constructor(private productService: ProductService) {}
    getProducts = async (req: Request, res: Response) => {
        try {
            const allProductData = await this.productService.getAllProduct();
            res.status(200).json({ success: true, body: allProductData});
        } catch (error) {
            winstonLogger.error(error.toString());
            res.status(500).json({ success: false, message: "Internal Server Error" });
        }
    };
    addProduct = async (req: any, res: Response) => {
        try {
            console.log("this is addProduct:", req.form)
            console.log("this is form:", req.form)
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


}
