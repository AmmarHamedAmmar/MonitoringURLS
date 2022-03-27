import { RequestHandler } from "express";

export const requestLoggerMiddleWare: RequestHandler = (req , res , next)=> {

    console.log(req.path , " - req body : " , req.body) ; 
    next() ; 

}