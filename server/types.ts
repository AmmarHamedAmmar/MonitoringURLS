import { RequestHandler } from "express"


export interface User {
    id : string   
    firstName : string 
    lastName : string 
    email : string  
    userName  :string 
    password : string 
}

export interface Uservarification {
    id : string , 
    userId : string , 
    varified : Number , 
}


export interface Checks {
    id : string 
    url : string 
    name : string
    protocol: string
    path : string| undefined
    port  : Number| undefined
    interval : number | undefined
    timeout : Number | undefined
    webhook : string | undefined
    threshold : string | undefined
    httpHeader : String | undefined
    statusCode : Number  | undefined
    ignoreSSL : string
    CheckUsername : string | undefined
    CheckPassword : string  | undefined
    tag : string  | undefined  
}


export interface Path {
    id : string 
    path : string 
    urlid: string 
}


export interface Reports {
    id : string 
    url : string 
    status : Number 
    availability : Number
    outages : Number
    downtime: Number
    uptime : Number 
    resonsetime  : Number 

}





export interface RequestsLogs {
    id : string  
    urlid : string 
    requesttype : string
    status : string
    history : Number
    
}

export interface UserURLs {
    userid : string 
    urlid : string 
}

export interface URLsTags {
    id : string 
    url : string
    urltag: string
}


/* Type checking */

export type  typeValidation<req , res>  = RequestHandler<
any,
Partial<message<res>> , 
Partial<req> , 
any
> 
export type message<T> = T & {message : string }
export interface JwtObject {
    userId: string;
}