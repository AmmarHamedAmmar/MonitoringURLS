import { RequestHandler } from "express";
import {models} from '../datastore/sql/Databse'
import { Checks, Reports, typeValidation, URLsTags } from "../types";
import {db} from '../datastore/datastoreInterface'


/* Type checking */



// typeValidation takes (the type of (req and res)  ) to guarantee that there is no error in our types  

export const  getReports : typeValidation<{} , {reports : Reports[]}> = async (req , res)=> {
    const reports : (Reports) [] =await  db.getReports() ; 

    
    // TODO : validate user
    // TODO : userID is going to be taken from the session
    res.send({reports : reports })


}
type TagType = Pick<URLsTags , 'urltag'>
export const getreportsByTag : typeValidation<TagType , {reports : Reports[]}> = async (req , res)=> {

    // if you try to remove this if statement , it will comblain as (undefined case for req.body.urltag) isnot handled  
    if(!req.body.urltag) return res.sendStatus(400)
    const Tag  : string  = req.body.urltag ; 

    
    // TODO : validate user , tag exsisting 
    // TODO : userID is going to be taken from the session
    res.send({reports :await db.getReportsByTag(Tag)} )

}

type urlType = Pick<Checks , 'url'>
export const getreportsByurl :  typeValidation<urlType , {reports : Reports[]}> = async(req , res)=> {
    
    if(!req.body.url) return  res.sendStatus(400)
    const url = req.body.url
    
    // TODO : validate user , url exsisting 
    // TODO : userID is going to be taken from the session

    res.send({reports : await db.getReportByURL(url) })

}

