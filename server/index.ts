
import {getChecks , getCheckByURL, deleteCheck, createTag} from './Handler/checkHandler'
import express , {RequestHandler} from 'express' 
import { getReports, getreportsByTag, getreportsByurl } from './Handler/reportHandler'
import asyncHandler from "express-async-handler"
import {db, initDB} from './datastore/datastoreInterface'
import { errHandler } from './middleware/errorMiddleware';
import { signIn, signUp, signUpvarification } from './Handler/authHandler'
import { requestLoggerMiddleWare } from './middleware/loggerMiddleWare'
import dotenv from  'dotenv' ; 
import { authMiddleware } from './middleware/authMiddleware'
import {start} from './Handler/monitoringHandler'
// make the whole file async in this async func 
(async ()=> {
    
    await initDB()
    dotenv.config()
    const app = express() 
    
    app.use(express.json())

    app.use(requestLoggerMiddleWare)

    app.use((req , res , next)=>{
        console.log(Date.now())
        next()
    }) 
    
    
    // public endpoints 
    app.post('/v1/signUp'  , asyncHandler(signUp) )
    app.post('/v1/signIn'  , asyncHandler(signIn) )
    app.post('/v1/signUpVarification' , asyncHandler(signUpvarification))

    app.use(authMiddleware)

    //protected endpoints 

    app.get('/v1/check'  , asyncHandler(getChecks) )
    app.delete('/v1/check/url' , asyncHandler(deleteCheck))

    app.get('/v1/reports/list'  , asyncHandler(getReports) )
    app.get('/v1/reports/tag' , asyncHandler(getreportsByTag))
    app.get('/v1/reports/url' , asyncHandler(getreportsByurl))
    
    app.post('/v1/tag/url'  , asyncHandler(createTag) )

    app.use(errHandler)

    app.listen(8080)

})()





