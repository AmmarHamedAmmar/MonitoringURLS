import { RequestHandler } from "express";
import { Checks, Path } from "../types";
import {db} from '../datastore/datastoreInterface'

export type  typeValidation<req , res>  = RequestHandler<
any,
Partial<res> , 
Partial<req> , 
any
> 

export const getChecks : typeValidation<{},{checks : Checks []}> = (req , res)=> {

    res.send({checks : db.getAllChecks()})
}


type urlType = Pick<Checks , 'url'>
export const getCheckByURL : typeValidation<urlType,{checks : Checks []}> = (req , res)=> {
    
    if(!req.body.url) return res.sendStatus(400)
    const url = req.body.url
    res.send({checks : db.getCheckByURL(url)})
    
}

// here i want the req be in type Checks , and onl havaing url object  
type checkRequest = Pick<Checks , 'url'>

export const createCheck : typeValidation<checkRequest , {}> = (req , res)=> {

    if(!req.body.url) return res.sendStatus(400)
    const url : string  = req.body.url ; 
    db.createCheck(url)
    res.sendStatus(201)

}


export const deleteCheck : typeValidation<checkRequest , {}> = (req , res)=> {
    
    if(!req.body.url) return res.sendStatus(400)
    const url : string  = req.body.url ; 

    // unChecked , need to check if the this url aleardy exists or not 
    db.deleteCheck(url)
    res.sendStatus(200)
}

type requestType = Pick<Path, 'path' | 'urlid'>
export const deleteCheckPath : typeValidation<requestType , {}> = (req , res)=> {
    
    if(!req.body.urlid || !req.body.path) return res.sendStatus(400)
    const url : string  = req.body.urlid ; 
    const path : string  = req.body.path ; 
    
    // unChecked , need to check if the this path aleardy exists or not 
    db.deletePath(url , path )
    res.sendStatus(200)
}