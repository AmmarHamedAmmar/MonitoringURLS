
// 

/* 
    all operations processes on the user object  , 
    only we need is to implement this interface

*/

import { User } from "../types";


export interface UserDao { 

    createUser(User : User) : void 
    getUserByEmail(email : string , password : string ) : User
    getUserByUsername(username :string , password : string ) : User
}

