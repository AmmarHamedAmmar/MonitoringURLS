import { typeValidation, User } from "../types"
import {db} from '../datastore/datastoreInterface'
import crypto from 'crypto';


type userSignUpRequest = Pick<User , 'firstName' | 'lastName' | 'password' | 'email' |'userName'>
type userLogin = Pick<User , 'userName' | 'password'>
type userLoginResponse = Pick<User , 'email' | 'firstName' | 'lastName' | 'userName' >
export const signUp :typeValidation<userSignUpRequest,{} > = async (req , res)=> {
    const user = req.body

    if(!validateUser(req.body)){
        return res.status(422).send(unprocessableEntityResponse)
        
    }
    if(await userAlreadyExists(user)) {
        return res.status(200).send('user aleady exists ')
        // redirect him to the loging page 

    }

    const USER: User = {
        id: crypto.randomUUID(),
        firstName : user.firstName!,
        lastName : user.lastName!,
        email : user.email!,
        userName : user.userName!,
        password : ((user.password)!)
    };
      await db.createUser(USER);
      return res.sendStatus(201).send('created successfully')
    

}

export const signIn : typeValidation<userLogin ,{}> = async (req , res)=> {
    const user  =req.body
    console.log("user is  : " , user )
    if(!validateLogin) {
        return res.status(422).send(unprocessableEntityResponse)
    }
    const exist  = await db.getUser(user.userName! , user.password!)
    if(!exist){


        /** first status code : 406 : 
        *       This response is sent when the web server, after performing server-driven content negotiation,
                doesn't find any content that conforms to the criteria given by the user agent.

            Second Status code : 403 which is unauthorized 
         */
        return res.status(403).send('user doesnot exist ')
    }
    const response : userLoginResponse = {
        email : exist.email , 
        lastName : exist.firstName , 
        firstName : exist.lastName , 
        userName : exist.userName
    }
        
     
    return res.status(200).send(response) ; 
}


export const signOut = ()=> {
    
}
function validateUser (user : Partial<userSignUpRequest>)  {
    
    if(! user.firstName)
        return false  ; 
    if(! user.lastName) 
        return false  ; 
    if(! user.email) 
        return false ; 
    if(! user.password) 
        return false ; 
    if(! user.userName) 
        return false ; 

    return true ; 
}

function validateLogin(user : userLogin) : boolean {
    if(!user.userName || !user.password) {
        return false   ; 
    }
    return true  ; 
}


function unprocessableEntityResponse() {
    return {
        "message" : "Unprocessable Entity , all fields are required " , 
        "error"  :"Invalid input"
    }
}

async function userAlreadyExists(user : Partial<userSignUpRequest>) {

    // It tells TypeScript that even though something looks like it could be null, it can be trusted
    // it can be trusted as i validate the request first .... 

    if(await db.getUserByEmail(user.email! ) || await db.getUserByUsername(user.userName!) )
        return true  ;  
    return false  ; 
}

function hashPassword(password: string): string {
    if(password) console.log("pass : " , password )
    return crypto.pbkdf2Sync(password, process.env.PASSWORD_SALT!, 42, 64, 'sha512').toString('hex');
}

