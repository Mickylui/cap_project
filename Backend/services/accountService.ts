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
            console.log("existUser:", existUserId);
            if (existUserId) {
                return { success: false, message: "accountName already exist" };
            }
            await txn("users").insert({
                account_name: accountName,
                email: email,
                password: password,
                is_admin: false,
            });
            console.log("AccountService-- this is accountName:", accountName);
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
            console.log("AccountService-- this is email:", email);
            console.log("AccountService-- this is password:", password);
            const existUserData = await txn("users").select("*").where("email", email).first();
            console.log("AccountService--this is userData:", existUserData);
            if (!existUserData) {
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
            return { success: true, body: { token, existUserData } };
        } catch (error) {
            await txn.rollback();
            winstonLogger.error(error.toString());
            return { success: false, message: "Internal Server Error" };
        }
    }
    async userDataJWT(tokenId: number, tokenUsername: string) {
        try {
            const userData = await this.knex("users")
                .select("*")
                .where("id", tokenId)
                .andWhere("account_name", tokenUsername)
                .first();
            if (!userData) {
                return { success: false, message: "Invalid token" };
            }
            return { success: true, body: userData };
        } catch (error) {
            winstonLogger.error(error.toString());
            return { success: false, message: "Internal Server Error" };
        }
    }
}
