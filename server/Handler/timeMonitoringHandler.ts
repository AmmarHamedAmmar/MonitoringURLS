import { db } from "../datastore/datastoreInterface";
import { Checks } from "../types";

/**
 * every 1 mins , check on all the URLs exisiting in the database ->>>>>>>>>>>>>>>>
 * if the url is down , send message to the check owner 
 * else store the state in reports table 
 */

type url_interval = Pick<Checks , 'url' | 'interval'>


const urlsArray : url_interval []  = []

const getAllUrls = async ()=> {

    const array : Checks[] | undefined = await db.getAllChecks()

    array?.map(singleCheck => {
        const obj : url_interval = {
            'url' : singleCheck.url , 
            'interval' : singleCheck.interval
        }
        urlsArray.push(obj)
    })

} 


const getMinDifferenceInInterval = async ()=> {
    
    return await getAllUrls().then(e => {
        let min_diff = 10000
        let lastItem  = 0 ; 
        urlsArray.map(singURL => {
            if(lastItem == 0 && singURL.interval) lastItem  =  singURL.interval 
            else{
                let min = Math.min(lastItem  , singURL.interval!)
                let max = Math.max(lastItem , singURL.interval!)
                if( (max - min) < min_diff) min_diff = max - min
            }
        })
        console.log("url_interval : " ,  urlsArray)

        return min_diff
        
    })

    
}


 const now = Date.now();
 
 const afterInteval = now + (1000 * 60) 
 if(Date.now() == afterInteval) {
    //updateAfterInterVale()
    //performMonitoring
 }
