import { RequestHandler } from "express";
import { Checks, Path, typeValidation } from "../types";
import {db} from '../datastore/datastoreInterface'
import crypto from 'crypto'


export const getChecks : typeValidation<{},{checks : Checks []}> = (req , res)=> {

    
    // TODO : validate user
    // TODO : userID is going to be taken from the session
    res.send({checks : db.getAllChecks()})
}


type urlType = Pick<Checks , 'url'>
export const getCheckByURL : typeValidation<urlType,{checks : Checks []}> = (req , res)=> {
    
    if(!req.body.url) return res.sendStatus(400)

    // TODO : validate user , url exsisting 
    // TODO : userID is going to be taken from the session
    const url = req.body.url
    res.send({checks : db.getCheckByURL(url)})
    
}

// here i want the req be in type Checks , and  having url object  
type checkRequest = Pick<Checks , 'url'>

export const createCheck : typeValidation<checkRequest , {}> = (req , res)=> {

    if(!req.body.url) return res.sendStatus(400)

    // TODO : validate user , url exsisting 
    // TODO : userID is going to be taken from the session 
    
    const url : string  = req.body.url ; 
    const check : Checks = {
        'url' : url , 
        'id' : crypto.randomUUID()
    }

    db.createCheck(check)
    res.sendStatus(201)

}


export const deleteCheck : typeValidation<checkRequest , {}> = (req , res)=> {
    
    if(!req.body.url) return res.sendStatus(400)
    const url : string  = req.body.url ; 

    
    // TODO : validate user , url exsisting 
    // TODO : userID is going to be taken from the session
    db.deleteCheck(url)
    res.sendStatus(200)
}



type requestType = Pick<Path, 'path' | 'urlid'>
export const deleteCheckPath : typeValidation<requestType , {}> = (req , res)=> {
    
    if(!req.body.urlid || !req.body.path) return res.sendStatus(400)
    const url : string  = req.body.urlid ; 
    const path : string  = req.body.path ; 

    
    // TODO : validate user , url exsisting 
    // TODO : userID is going to be taken from the session
    
    db.deletePath(url , path )
    res.sendStatus(200)
}