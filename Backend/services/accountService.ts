import { Knex } from "knex";
import { winstonLogger } from "../utils/winstonLogger";
import { checkPassword } from "../utils/hash";
import jwtSimple from "jwt-simple";
import jwt from "../jwt";

export class AccountService {
    constructor(private knex: Knex) {}
    async signUp(accountName: string, email: string, password: string) {
        const txn = await this.knex.transaction();
        try {
            const existUserId = await txn("users")
                .select("id")
                .where("account_name", accountName)
                .first();
            // console.log("existUser:", existUserId);
            if (existUserId) {
                return { success: false, message: "accountName already exist" };
            }
            await txn("users").insert({
                account_name: accountName,
                email: email,
                password: password,
                is_admin: false,
                default_contact: email,
            });
            // console.log("AccountService-- this is accountName:", accountName);
            console.log("AccountService-- this is email:", email);
            console.log("AccountService-- this is password:", password);
            await txn.commit();
            return { success: true };
        } catch (error) {
            await txn.rollback();
            winstonLogger.error(error.toString());
            return { success: false, message: "error" };
        }
    }
    async logIn(email: string, password: string) {
        const txn = await this.knex.transaction();
        try {
            // console.log("AccountService-- this is email:", email);
            // console.log("AccountService-- this is password:", password);
            const existUserData = await txn("users").select("*").where("email", email).first();
            console.log("AccountService--this is userData:", existUserData);
            if (!existUserData) {
                console.log("Invalid email");
                return { success: false, message: "Invalid email" };
            }
            const matchPassword = await checkPassword(password, existUserData.password);
            if (!matchPassword) {
                return { success: false, message: "Invalid password" };
            }
            const userData = {
                id: existUserData["id"],
                username: existUserData["account_name"],
            };
            const token = jwtSimple.encode(userData, jwt.jwtSecret);

            const combineUserData = await txn("users")
                .select(
                    "users.id",
                    "users.account_name",
                    "users.email",
                    "users.is_admin",
                    "users.created_at",
                    "users.updated_at",
                    "users.last_login_at",
                    "users.default_contact",
                    "user_info.first_name",
                    "user_info.last_name",
                    "user_info.icon",
                    "user_info.slogan",
                    "user_info.area",
                    "user_info.district",
                    "user_info.location",
                    "user_info.contact",
                    "user_info.gender",
                    "user_info.age_range",
                    "user_info.reason",
                    "user_info.learning_level"
                )
                .leftJoin("user_info", "user_info.user_id", "users.id")
                .where("users.id", existUserData.id);
            console.log("combineUserData:", combineUserData);
            const userShoppingDataArr = await txn("shopping_carts")
                .select("*")
                .where("shopping_carts.user_id", existUserData.id);

            console.log("userShoppingData:", userShoppingDataArr);

            await txn.commit();
            return { success: true, body: { token, combineUserData, userShoppingDataArr } };
        } catch (error) {
            await txn.rollback();
            winstonLogger.error(error.toString());
            return { success: false, message: "Internal Server Error" };
        }
    }
    async userDataJWT(tokenId: number) {
        const txn = await this.knex.transaction();
        try {
            console.log("tokenId:", tokenId);
            const combineUserData = await txn("users")
            .select(
                "users.id",
                "users.account_name",
                "users.email",
                "users.is_admin",
                "users.created_at",
                "users.updated_at",
                "users.last_login_at",
                "users.default_contact",
                "user_info.first_name",
                "user_info.last_name",
                "user_info.icon",
                "user_info.slogan",
                "user_info.area",
                "user_info.district",
                "user_info.location",
                "user_info.contact",
                "user_info.gender",
                "user_info.age_range",
                "user_info.reason",
                "user_info.learning_level"
            )
                .leftJoin("user_info", "user_info.user_id", "users.id")
                .where("users.id", tokenId);
            console.log("combineUserData:", combineUserData);
            const userShoppingDataArr = await txn("shopping_carts")
                .select("*")
                .where("shopping_carts.user_id", tokenId);

            console.log("userShoppingData:", userShoppingDataArr);
            if (!combineUserData) {
                return { success: false, message: "Invalid token" };
            }
            await txn.commit();
            return { success: true, body: { combineUserData, userShoppingDataArr } };
        } catch (error) {
            await txn.rollback();
            winstonLogger.error(error.toString());
            return { success: false, message: "Internal Server Error" };
        }
    }
}
