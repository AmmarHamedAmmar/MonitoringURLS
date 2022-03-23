
import {getChecks , getCheckByURL} from './Handler/checkHandler'
import express , {RequestHandler} from 'express' 
import { getReports } from './Handler/reportHandler'


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
app.get('/check'  , getChecks)
app.get('/check/url'  , getCheckByURL)
app.get('/reports/list'  , getReports)




app.listen(8080)