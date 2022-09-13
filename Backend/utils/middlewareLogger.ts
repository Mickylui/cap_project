import { Request, Response, NextFunction } from "express";

export default function middlewareLogger(req:Request, res:Response, next: NextFunction){
    console.log("this is middlewareLogger")
    next()
}