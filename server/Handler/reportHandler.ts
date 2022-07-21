import { RequestHandler } from "express";
import {models} from '../datastore/sql/Databse'
import { Checks, Reports, typeValidation, URLsTags } from "../types";
import {db} from '../datastore/datastoreInterface'
import { check } from "prettier";





// typeValidation takes (the type of (req and res)  ) to guarantee that there is no error in our types  

export const  getReports : typeValidation<{} , {reports : Reports[]}> = async (req , res)=> {
    const reports : (Reports) [] = await  db.getReports() ; 

   return  res.status(200).send({reports : reports })
}
type TagType = Pick<URLsTags , 'urltag'>
export const getreportsByTag : typeValidation<TagType , {reports : any[]}> = async (req , res)=> {

    // if you try to remove this if statement , it will comblain as (undefined case for req.body.urltag) isnot handled  
    if(!req.body.urltag) return res.sendStatus(400)
    const Tag  : string  = req.body.urltag ; 

    const urls : Checks[] | undefined = await db.getURLsByTag(Tag)
    if(!urls) {
        return res.send({message : "no checks available with this tag "})
    }

    const Allreports : any[] = []
    for (let index in urls ) {
        const singleURL : string | undefined = urls.pop()?.url
        const report : Reports[] | undefined = await db.getReportByURL(singleURL!)
        Allreports.push(report)
      }

      return res.status(200).send({reports : Allreports})
}

type urlType = Pick<Checks , 'url'>
export const getreportsByurl :  typeValidation<urlType , {reports : Reports[]}> = async(req , res)=> {
    
    if(!req.body.url) return  res.sendStatus(400)
    const url = req.body.url
    res.send({reports : await db.getReportByURL(url) })

}

