import { RequestHandler } from "express";
import { Checks, Path, typeValidation } from "../types";
import {db} from '../datastore/datastoreInterface'
import crypto from 'crypto'

export const getChecks : typeValidation<{},{checks : Checks []}> = async (req , res)=> {

    
    res.send({checks : await db.getAllChecks()})
}


type urlType = Pick<Checks , 'url'>
export const getCheckByURL : typeValidation<urlType,{checks : Checks []}> = async (req , res)=> {
    
    if(!req.body.url) return res.sendStatus(400)


    const url = req.body.url
    res.send({checks : await  db.getCheckByURL(url)})
    
}

type checkRequest = Pick<Checks , 'url'>

export const createCheck : typeValidation<checkRequest , {}> = async (req , res)=> {

    if(!req.body.url) return res.sendStatus(400)
    
    const url : string  = req.body.url ; 
    const check : Checks = {
        'url' : url , 
        'id' : crypto.randomUUID()
    }


    await db.createCheck(check)
    res.sendStatus(201)

}


export const deleteCheck : typeValidation<checkRequest , {}> =async  (req , res)=> {
    
    if(!req.body.url) return res.sendStatus(400)
    const url : string  = req.body.url ; 

    await db.deleteCheck(url)
    res.sendStatus(200)
}



type requestType = Pick<Path, 'path' | 'urlid'>
export const deleteCheckPath : typeValidation<requestType , {}> = async (req , res)=> {
    
    if(!req.body.urlid || !req.body.path) return res.sendStatus(400)
    const url : string  = req.body.urlid ; 
    const path : string  = req.body.path ; 
    
    await db.deletePath(url , path )
    res.sendStatus(200)
}