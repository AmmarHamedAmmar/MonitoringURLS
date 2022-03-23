
// 

/* 
    checks operations 

*/

import { Checks } from "../types";


export interface CheckDao { 

    createCheck(url : string ) : void 
    getAllChecks () : Checks[]
    getCheckByURL(url : string) : Checks[] | undefined
    deletePath(url :string , path : string ) : void | undefined
    deleteCheck(url : string ) : void | undefined

}

/* 
    create tags 

*/

export interface TagDao{

    creaeteTag(tag : string , url : string  ) :  void | undefined 
    // if the url posted is not existed  
}

