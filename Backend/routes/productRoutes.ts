import express from "express";
import { productController } from "../server";
// import middlewareLogger from "../utils/middlewareLogger";
import { formidableMiddleware } from "../utils/formidableMiddleware";

export const productRoutes = express.Router();

productRoutes.get("/", productController.getProducts);
productRoutes.post("/addProduct", formidableMiddleware, productController.addProduct);
productRoutes.get("/getProductDetailByProductIdFetch", formidableMiddleware, productController.productDetailByProductId);
productRoutes.get("/cart/data", formidableMiddleware, productController.getAllCartItems)
productRoutes.delete("cart/data/:id", productController.removeCartItem);