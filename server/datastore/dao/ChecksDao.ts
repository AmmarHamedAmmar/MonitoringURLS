
// 

/* 
    checks operations 

*/

import { Checks, URLsTags } from "../../types";


export interface CheckDao { 

    createCheck(check : Checks ) : Promise<void> 
    getAllChecks () : Promise<Checks[] | undefined >
    getCheckByURL(url : string) : Promise <Checks[] | undefined>
    deletePath(url :string , path : string ) : Promise <void | undefined > 
    deleteCheck(url : string ) : Promise <void | undefined > 
    getURLsByTag(tag : string) : Promise <Checks[] | undefined>
    createCheckAuth(id :string  , username : string , password : string , url :string ) : Promise <void | undefined > 

}

/* 
    create tags 

*/

export interface TagDao{

    creaeteTag(URLTag :  URLsTags  ) :  Promise<void | undefined >
}

