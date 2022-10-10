export class ApplicationError extends Error {
    constructor(message: string, public httpStatus: number) {
        super(message);

        Object.setPrototypeOf(this, ApplicationError.prototype);
    }
}

export class InternalServerError extends ApplicationError {
    constructor() {
        super("Internal Server Error", 500);
    }
}

export class InvalidParamError extends ApplicationError {
    constructor() {
        super("Invalid Params", 400);
    }
}

// const err = new ApplicationError("message", 400);
// const err2 = new Error("message");

// console.log(err instanceof ApplicationError); // True
// console.log(err instanceof Error); // True

// console.log(err2 instanceof ApplicationError); // False
// console.log(err2 instanceof Error); // True
