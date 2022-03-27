import { RequestHandler } from "express"


export interface User {
    id : string   
    firstName : string 
    lastName : string 
    email : string  
    userName  :string 
    password : string 
}


export interface Checks {
    id : string 
    url : string 
    
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


export interface CheckTime {

    urlid : string
    checktime : Number
    
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
    urlid : string
    urltag: string
    
}

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