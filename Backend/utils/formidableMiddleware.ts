import formidable from "formidable";
import type { Fields, Files } from "formidable";
import path from "path";
import { Request, Response, NextFunction } from "express";
import {winstonLogger} from "./winstonLogger"
// import { fs } from "fs";


declare global{
    namespace Express{
        interface Request{
            form?:{
                fields: Fields;
                files: Files;
            }
        }
    }
}

const uploadDir = path.join(__dirname,"../","private","assets","posts");

const form = formidable({
    uploadDir,
    keepExtensions: true,
    allowEmptyFiles:true,
    maxFiles: 5,
    multiples: true,
    maxFileSize: 200 * 1024 ** 2,
    filter: (part) => part.mimetype?.startsWith("image/")|| false
})

export function formidableMiddleware(req:Request,res:Response,next:NextFunction){
    form.parse(req,(err, fields, files)=>{
        if(err){
            winstonLogger.error(err.toString())

        }
        req.form = {fields, files};

        next();
    })
}