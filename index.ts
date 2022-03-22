// here we start monitoring app which track the performance of given urls by the user 
// we have to make authentication 


import express , {RequestHandler} from 'express' 
const app = express() 

// as in express they cant read json body ,,, if you run the following requests without this line ,
// and try to print && the body in json ->  express will return undefined ...  
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
app.get('/'  ,  (req , res) => {
    res.send("iam running as purppose ")
})

app.post('/posts'  ,   (req , res ) => {
    res.send(req.body)
})

app.listen(8080)