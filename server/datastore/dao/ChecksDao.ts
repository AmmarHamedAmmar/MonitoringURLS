
// 

/* 
    checks operations 

*/

import { Checks } from "../../types";


export interface CheckDao { 

    createCheck(check : Checks ) : Promise<void> 
    getAllChecks () : Promise<Checks[]>
    getCheckByURL(url : string) : Promise <Checks[] | undefined>
    deletePath(url :string , path : string ) : Promise <void | undefined > 
    deleteCheck(url : string ) : Promise <void | undefined > 

}

/* 
    create tags 

*/

export interface TagDao{

    creaeteTag(tag : string , url : string  ) :  Promise<void | undefined >
}

