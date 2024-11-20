const express=require('express')
const MongoConnect=require('mongoose')
const app=express();
const Cookies=require('cookie-parser')
const router=require('./Routes/routes')
const cors=require('cors')
const {ConfigRoute,AuthUsers}=require('./MiddleWare/AuthRoutes')
 require('dotenv').config()
 const corsOptions = {
    origin: 'http://localhost:3000',
    credentials: true,  
  };
app.use(cors(corsOptions));
app.use(express.json())
app.use(Cookies());
app.use('/api',router);
app.use(express.static('./public'));


const ConnectionUrl=process.env.mongodb_url;
MongoConnect.connect(ConnectionUrl)
.then(_=>{
console.log('Mongo is connected');
app.listen(process.env.port);
})
.catch((err)=> console.error(err))


app.get('/',(req,res)=>{    
    res.status(201).json({Message:'ITS WORKING PROPERLY'})
})

