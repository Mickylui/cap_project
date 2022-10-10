import { ApplicationError } from "./utils/errors";
import express from "express";
import http from "http";
import Knex from "knex";
import cors from "cors";
import path from "path";

import dotnev from "dotenv";
dotnev.config();

const app = express();
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

//accept other host
// app.use(cors({ origin: [process.env.FRONTEND_URL ?? "http://localhost:3000"] }));
app.use(cors({ origin: ["https://mickybad.me"] }));

//knex setup
import knexConfigs from "./knexfile";
const configMode = process.env.NODE_ENV || "development";
const knexConfig = knexConfigs[configMode];
const knex = Knex(knexConfig);

// server & controller set up
import { AdminService } from "./services/adminService";
import { AdminController } from "./controllers/adminController";
import { AccountService } from "./services/accountService";
import { AccountController } from "./controllers/accountController";

export const accountService = new AccountService(knex);
export const accountController = new AccountController(accountService);
const adminService = new AdminService(knex);
export const adminController = new AdminController(adminService);

import { PostService } from "./services/postService";
import { PostController } from "./controllers/postController";

export const postService = new PostService(knex);
export const postController = new PostController(postService);

import { ProductService } from "./services/productService";
import { ProductController } from "./controllers/productController";

export const productService = new ProductService(knex);
export const productController = new ProductController(productService);

import { UserService } from "./services/userService";
import { UserController } from "./controllers/userController";

export const userService = new UserService(knex);
export const userController = new UserController(userService);

import { accountRoutes } from "./routes/accountRoutes";
import { postRoutes } from "./routes/postRoutes";
import { productRoutes } from "./routes/productRoutes";
import { userRoutes } from "./routes/userRoutes";

import { adminRoutes } from "./routes/adminRoutes";
// route handling
app.use("/account", accountRoutes);
app.use("/posts", postRoutes);
app.use("/products", productRoutes);
app.use("/user", userRoutes);
app.use("/admin", adminRoutes);

//folder path
app.use(express.static(path.join(__dirname, "private")));

app.use(
    (
        err: ApplicationError,
        req: express.Request,
        res: express.Response,
        next: express.NextFunction
    ) => {
        console.error(err.stack);
        res.status(err.httpStatus).json({ message: err.message });
    }
);

const PORT = 8080;
const server = http.createServer(app);

server.listen(PORT, () => {
    console.log(`listening at http://localhost:${PORT}`);
});
