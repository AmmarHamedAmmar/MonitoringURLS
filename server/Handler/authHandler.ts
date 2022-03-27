import { JwtObject, typeValidation, User, Uservarification } from "../types"
import {db} from '../datastore/datastoreInterface'
import crypto from 'crypto';
import { signJwt, verifyJwt  } from "../auth";
import nodemailer from 'nodemailer'
import jwt from 'jsonwebtoken';


export interface SignUpResponse {
    jwt: string;
  }
type userSignUpRequest = Pick<User , 'firstName' | 'lastName' | 'password' | 'email' |'userName'>
type userLogin = Pick<User , 'userName' | 'password'>
export interface userLoginResponse {
    user : Pick<User , 'email' | 'firstName' | 'lastName' | 'userName' > , 
    jwt : string
}
export const signUp :typeValidation<userSignUpRequest,SignUpResponse > = async (req , res)=> {
    const user = req.body

    if(!validateUser(req.body)){
        return res.status(422).send({message : unprocessableEntityResponse()})
        
    }
    if(await userAlreadyExists(user)) {
        return res.status(200).send({message : 'user aleady exists '})

    }

    const USER: User = {
        id: crypto.randomUUID(),
        firstName : user.firstName!,
        lastName : user.lastName!,
        email : user.email!,
        userName : user.userName!,
        password : hashPassword((user.password)!)
    };
    const jwt = signJwt({ userId: USER.id });
    emailVarification(user.email! , jwt)

    await db.createUser(USER);
      
    return res.status(201).send({message : 'created successfully' , jwt })
    

}

export const signIn : typeValidation<userLogin ,userLoginResponse> = async (req , res)=> {
    const user  =req.body

    if(!validateLogin) {
        return res.status(422).send({message : unprocessableEntityResponse() }  )
    }
    const exist  = await db.getUser(user.userName! , hashPassword(user.password!))
    if(!exist){
        /** first status code : 406 : 
        *       This response is sent when the web server, after performing server-driven content negotiation,
                doesn't find any content that conforms to the criteria given by the user agent.

            Second Status code : 403 which is unauthorized 
         */
        return res.status(403).send({message : 'user doesnot exist '})
    }

    const jwt = signJwt({ userId: exist.id });
    const response : userLoginResponse = {
        user: {
            email: exist.email,
            firstName: exist.firstName,
            lastName: exist.lastName,
            userName: exist.userName,
        } , 
        jwt,
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

async function validateLogin(user : userLogin) : Promise<boolean> {
    if(!user.userName || !user.password || !await userIsActivated(user)) {
        return false   ; 
    }
    return true  ; 
}

async function userIsActivated (user:userLogin) : Promise<boolean> {
    const User : User | undefined = await db.getUserByUsername(user.userName)
    if(User) {
        const userId : string  = User.id
        const userVarification  = await db.getUserVarification(userId)
        if(userVarification?.varified == 1) return true 
    }   
    return false 
}
 
function unprocessableEntityResponse() {
    return "Unprocessable Entity , all fields are required "
}

async function userAlreadyExists(user : Partial<userSignUpRequest>) {

    // It tells TypeScript that even though something looks like it could be null, it can be trusted
    // it can be trusted as i validate the request first .... 

    if(await db.getUserByEmail(user.email! ) || await db.getUserByUsername(user.userName!) )
        return true  ;  
    return false  ; 
}


export const signUpvarification : typeValidation<JwtObject , {}> =async (req , res) => {
    const token  = req.body.userId
    const userId  = verifyJwt(token!)
    const USER: Uservarification = {
        id: crypto.randomUUID(),
        userId : userId.userId  , 
        varified : 1 , 
    };
    await db.varifyUser(USER)
    res.status(200).send({message : "varified"}) ; 


}
function hashPassword(password: string): string {
    if(password) console.log("pass : " , password )
    return crypto.pbkdf2Sync(password, process.env.MY_SECRET_SALT!, 42, 64, 'sha512').toString('hex');
}


export async function emailVarification  (email : string , token : string ) {
    let transporter = nodemailer.createTransport({
        service : 'gmail' , 
        auth : {
            user : process.env.AUTH_EMAIL , 
            pass : process.env.AUTH_PASSWORD
        }
    }
        
    )

    let mailOptions = {
        from : process.env.AUTH_EMAIL , 
        to : email , 
        subject : "hi from here" , 
        html :`<h2> please click on the following link to activate your acount</h2>
                <p>${process.env.CLIENT_URL}/activation/${token}</p> `
    } 
     transporter.sendMail(mailOptions , function(err , succ) {
        if(err) return false 
    }) ;
    return true ; 
}


