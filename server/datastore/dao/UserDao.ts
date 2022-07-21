
// 

/* 
    all operations processes on the user object  , 
    only we need is to implement this interface

*/

import { User, Uservarification } from "../../types";


export interface UserDao { 

    createUser(User : User) : Promise<void> 
    getUserByEmail(email : string  ) : Promise<User | undefined>
    getUserByUsername(username :string   ) : Promise<User | undefined > 
    getUser(username : string  , password : string) : Promise<User | undefined>
    getUserVarification(userId: string) : Promise<Uservarification | undefined>
    varifyUser(user :Uservarification ) : Promise<void> 
    getUserById(userId: string) : Promise<User | undefined>
}

