import express from "express";
// import path from "path";
import http from "http";
import expressSession from "express-session";
import Knex from "knex";

const app = express();
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(
    expressSession({
        secret: "welcome to our website",
        resave: true,
        saveUninitialized: true,
    })
);

//knex setup
import knexConfigs from "./knexfile";
const configMode = process.env.Node_ENV || "development";
const knexConfig = knexConfigs[configMode];
const knex = Knex(knexConfig);

// server & controller set up
import { AdminService } from "./services/adminService";
import { AdminController } from "./controllers/adminController";
import { UserService } from "./services/userService";
import { UserController } from "./controllers/userController";
const adminService = new AdminService(knex);
export const adminController = new AdminController(adminService);
const userService = new UserService(knex);
export const userController = new UserController(userService);

// route handling

const PORT = 8080;
const server = http.createServer(app);

server.listen(PORT, () => {
    console.log(`listening at http://localhost:${PORT}`);
});
