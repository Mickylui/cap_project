import { AccountService } from "../services/accountService";
import { AccountController } from "../controllers/accountController";
import type { Knex } from "knex";
import type { Request, Response } from "express";

jest.mock("../services/accountService");

describe("accountService", () => {
    let service: AccountService;
    let controller: AccountController;
    let req: Request;
    let res: Response;

    beforeEach(() => {
        service = new AccountService({} as Knex);
        service.signUp = jest.fn();
        req = {
            params: {},
            query: {},
            body: {},
        } as Request;
        res = {
            status: jest.fn(() => res),
            json: jest.fn(),
        } as any as Response;

        controller = new AccountController(service);
    });

    it("signUp - success", async () => {
        await controller.signUp(req, res);
        expect(service.signUp).toBeCalled();
        expect(res.json).toBeCalledWith({ success: true });
    });

    it("signUp - failed with error from service", async () => {
        await controller.signUp(req, res);
        expect(service.signUp).toBeCalled();
        expect(res.json).toBeCalledWith({ success: false, message: "internal server error" });
    });
});
