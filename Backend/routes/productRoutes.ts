import express from "express";
import { productController } from "../server";
// import middlewareLogger from "../utils/middlewareLogger";
import { formidableMiddleware } from "../utils/formidableMiddleware";
import { isLoggedIn } from "../utils/isLoggedInGuard";

export const productRoutes = express.Router();

productRoutes.get("/", productController.getProducts);
productRoutes.post("/addProduct", formidableMiddleware, productController.addProduct);
productRoutes.get(
    "/getProductDetailByProductIdFetch",
    formidableMiddleware,
    productController.productDetailByProductId
);
productRoutes.get("/cart", isLoggedIn, productController.getAllCartItems);
productRoutes.post("/cart/add", isLoggedIn, productController.addToCart);
productRoutes.delete("cart/:id", isLoggedIn, productController.removeCartItem);
