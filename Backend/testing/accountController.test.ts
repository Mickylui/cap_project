import { AccountService } from "../services/accountService";
import { AccountController } from "../controllers/accountController";
import type { Knex } from "knex";
import type { Request, Response } from "express";
import jwtSimple from "jwt-simple";
import { checkPassword } from "../utils/hash";

jest.mock("../services/accountService");
jest.mock("jwt-simple");
jest.mock("../utils/hash");

describe("accountService", () => {
    let service: AccountService;
    let controller: AccountController;
    let req: Request;
    let res: Response;

    beforeEach(() => {
        service = new AccountService({} as Knex);
        service.logIn = jest.fn(() => Promise.resolve({ success: true, message: "" }));

        req = {
            params: {},
            query: {},
            body: {},
        } as Request;
        res = {
            status: jest.fn(() => res),
            json: jest.fn(),
        } as any as Response;

        (checkPassword as jest.Mock).mockResolvedValue(true);
        controller = new AccountController(service);
    });

    it("logIn - missing password", async () => {
        req.body = { email: "admin@1.com" };
        await controller.logIn(req, res);
        expect(service.logIn).toBeCalled();
        expect(res.json).toBeCalledWith({ success: false, message: "Invalid password" });
    });

    // it("logIn - failed with error from service", async () => {
    //     await controller.logIn(req, res);
    //     expect(service.logIn).toBeCalled();
    //     expect(res.json).toBeCalledWith({ success: false, message: "internal server error" });
    // });
});
