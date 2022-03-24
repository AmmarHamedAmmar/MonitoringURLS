
import {getChecks , getCheckByURL} from './Handler/checkHandler'
import express , {RequestHandler} from 'express' 
import { getReports } from './Handler/reportHandler'
import asyncHandler from "express-async-handler"
import {db, initDB} from './datastore/datastoreInterface'
import { errHandler } from './middleware/errorMiddleware';

// make the whole file async in async func 
(async ()=> {
    
    await initDB()
    const app = express() 
    
    app.use(express.json())

    const requestLoggerMiddleWare: RequestHandler = (req , res , next)=> {

        console.log(req.path , " - req body : " , req.body) ; 
        next() ; 

    }
    app.use(requestLoggerMiddleWare)

    app.use((req , res , next)=>{
        console.log(Date.now())
        next()
    }) 


    const posts :  any[] = []
    app.get('/check'  , asyncHandler(getChecks) )
    app.get('/check/url'  , asyncHandler(getCheckByURL))
    app.get('/reports/list'  , asyncHandler(getReports) )

    app.use(errHandler)

    app.listen(8080)

})()




