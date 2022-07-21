import { RequestHandler } from "express";
import { Checks, Path, typeValidation, URLsTags } from "../types";
import {db} from '../datastore/datastoreInterface'
import crypto from 'crypto'


type tagType = Pick<URLsTags, 'urltag' | 'url'>
export const getChecks : typeValidation<{},{checks : Checks []}> = async (req , res)=> {

    res.status(200).send({checks : await db.getAllChecks()})
}


type urlType = Pick<Checks , 'url'>
export const getCheckByURL : typeValidation<urlType,{checks : Checks []}> = async (req , res)=> {
    
    if(!req.body.url) return res.sendStatus(400).send({message : "all field are reqired"})

    const url = req.body.url
    res.status(200).send({checks : await  db.getCheckByURL(url)})
    
}


export const createCheck : typeValidation<Checks , {}> = async (req , res)=> {
    const data = req.body
    if(!data.url || ! data.name || !data.ignoreSSL || !data.protocol ) 
        return res.sendStatus(400)


    if(data.CheckUsername && data.CheckPassword) {
        await db.createCheckAuth(crypto.randomUUID() , data.CheckUsername , hashPassword(data.CheckPassword) ,data.url )

    }
    if(data.tag) {
        const tag : tagType = {
            'url' : data.url , 
            'urltag' : data.tag
        }
        createTage(tag)
    }

    const check : Checks = {
        'url' : data.url , 
        'id' : crypto.randomUUID() , 
        'interval' : data.interval ,
        'CheckPassword' : data.CheckPassword , 
        'CheckUsername' : data.CheckUsername , 
        'protocol' : data.protocol , 
        'timeout' : data.timeout , 
        'ignoreSSL' : data.ignoreSSL , 
        'path' : data.path , 
        'name' : data.name , 
        'statusCode' : data.statusCode , 
        'webhook' : data.webhook , 
        'httpHeader' : data.httpHeader , 
        'port' : data.port , 
        'threshold' :data.threshold, 
        'tag' : data.tag
    }
    await db.createCheck(check)
    res.sendStatus(201).send({message : "created"})

}

type checkRequest  = Pick<Checks , 'url'>
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




export const createTag : typeValidation<tagType , {}>  = async (req, res) => {

    if(!req.body.url || !req.body.urltag) return res.sendStatus(400).send({message : "all field are required"})
    const url : string  = req.body.url;
    const tag : string = req.body.urltag

    const urlTagObj : URLsTags =  {
        urltag : tag ,
        id :  crypto.randomUUID() , 
        url : url

    }
    await db.creaeteTag(urlTagObj)
    return res.status(201).send({message : "created"})
}

async function createTage(tag : tagType) {

    const newTag :URLsTags = {
        'id' :  crypto.randomUUID() , 
        'url' : tag.url , 
        'urltag' : tag.urltag
    }
    await db.creaeteTag(newTag)

}

function hashPassword(password: string): string {
    if(password) console.log("pass : " , password )
    return crypto.pbkdf2Sync(password, process.env.MY_SECRET_SALT!, 42, 64, 'sha512').toString('hex');
}