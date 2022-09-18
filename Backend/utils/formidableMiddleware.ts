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

const uploadDir = path.join(__dirname,"../","private","assets");

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
    // console.log("this is formidableMiddleware:", req.body)
    form.parse(req,(err, fields, files)=>{
        if(err){
            winstonLogger.error(err.toString())
        }
        req.form = {fields, files};
        console.log("formidable fields:", fields)
        console.log("formidable files:", files)
        console.log("formidable req.form:", req.form)
        next();
    })
}