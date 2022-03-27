import { RequestHandler } from "express";
import { Checks, Path, typeValidation, URLsTags } from "../types";
import {db} from '../datastore/datastoreInterface'
import crypto from 'crypto'

export const getChecks : typeValidation<{},{checks : Checks []}> = async (req , res)=> {

    res.status(200).send({checks : await db.getAllChecks()})
}


type urlType = Pick<Checks , 'url'>
export const getCheckByURL : typeValidation<urlType,{checks : Checks []}> = async (req , res)=> {
    
    if(!req.body.url) return res.sendStatus(400).send({message : "all field are reqired"})

    const url = req.body.url
    res.status(200).send({checks : await  db.getCheckByURL(url)})
    
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
    res.sendStatus(201).send({message : "created"})

}


export const deleteCheck : typeValidation<checkRequest , {}> =async  (req , res)=> {
    
    if(!req.body.url) return res.sendStatus(400)
    const url : string  = req.body.url ; 

    await db.deleteCheck(url)
    res.sendStatus(200).send({message : "DELETED"})
}



type requestType = Pick<Path, 'path' | 'urlid'>
export const deleteCheckPath : typeValidation<requestType , {}> = async (req , res)=> {
    
    if(!req.body.urlid || !req.body.path) return res.sendStatus(400)
    const url : string  = req.body.urlid ; 
    const path : string  = req.body.path ; 
    
    // await db.deletePath(url , path )
    // res.sendStatus(200)
}


type tagType = Pick<URLsTags, 'urltag' | 'urlid'>

export const createTag : typeValidation<tagType , {}>  = async (req, res) => {

    if(!req.body.urlid || !req.body.urltag) return res.sendStatus(400).send({message : "all field are required"})
    const urlId : string  = req.body.urlid
    const tag : string = req.body.urltag

    const urlTagObj : URLsTags =  {
        urltag : tag ,
        id :  crypto.randomUUID() , 
        urlid : urlId

    }
    await db.creaeteTag(urlTagObj)
    return res.status(201).send({message : "created"})
}