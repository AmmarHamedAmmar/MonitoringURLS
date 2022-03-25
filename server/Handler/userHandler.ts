import { typeValidation, User } from "../types"
import {db} from '../datastore/datastoreInterface'
import crypto from 'crypto';


type userSignUpRequest = Pick<User , 'firstname' | 'lastname' | 'password' | 'email' |'username'>

export const signUp :typeValidation<userSignUpRequest,{} > = async (req , res)=> {
    const user = req.body

    if(!validateUser(req.body)){
        return res.status(422).send(unprocessableEntityResponse)
        
    }
    if(await userAlreadyExists(user)) {
        return res.status(200).send('user aleady exists ')

    }

    const USER: User = {
        id: crypto.randomUUID(),
        firstname : user.firstname!,
        lastname : user.lastname!,
        email : user.email!,
        username : user.username!,
        password : (user.password)!
    };
      await db.createUser(USER);
      return res.sendStatus(200)
    

}

export const signIn = ()=> {
    
}


export const signOut = ()=> {
    
}
function validateUser (user : Partial<userSignUpRequest>)  {
    
    if(! user.firstname)
        return false  ; 
    if(! user.lastname) 
        return false  ; 
    if(! user.email) 
        return false ; 
    if(! user.password) 
        return false ; 
    if(! user.username) 
        return false ; 

    return true ; 
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

    if(await db.getUserByEmail(user.email! , user.password!) || await db.getUserByUsername(user.username! , user.password!) )
        return true  ;  
    return false  ; 
}

function hashPassword(password: string | undefined): string {
    return crypto.pbkdf2Sync(password!, process.env.PASSWORD_SALT!, 42, 64, 'sha512').toString('hex');
}

