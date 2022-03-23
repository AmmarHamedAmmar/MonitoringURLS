import { RequestHandler } from "express";
import {models} from '../datastore/sql/index'
import { Checks, Reports, URLsTags } from "../types";
import {db} from '../datastore/datastoreInterface'


/* Type checking */

export type  typeValidation<req , res>  = RequestHandler<
any,
Partial<res> , 
Partial<req> , 
any
> 

// typeValidation takes (the type of (req and res)  ) to guarantee that there is no error in our types  

export const  getReports : typeValidation<{} , {reports : Reports[]}> = (req , res)=> {
    const reports : (Reports) [] = db.getReports() ; 
    res.send({reports : reports })


}
type TagType = Pick<URLsTags , 'urltag'>
export const getreportsByTag : typeValidation<TagType , {reports : Reports[]}> = (req , res)=> {

    // try to remove this if statement , it will comblain as (undefined case for req.body.urltag) isnot handled  
    if(!req.body.urltag) return res.sendStatus(400)
    const Tag  : string  = req.body.urltag ; 

    // unChecked , need to check if the this url aleardy exists or not 
    res.send({reports : db.getReportsByTag(Tag)} )

}

type urlType = Pick<Checks , 'url'>
export const getreportsByurl :  typeValidation<urlType , {reports : Reports[]}> = (req , res)=> {
    
    if(!req.body.url) return  res.sendStatus(400)
    const url = req.body.url
    // unChecked , need to check if the this url aleardy exists or not 
    res.send({reports :db.getReportByURL(url) })

}

