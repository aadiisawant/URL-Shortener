const express = require('express');
const urlRoute = require('./routes/url')
const cookieParser = require('cookie-parser')
const staticRoute = require('./routes/staticRouter')
const { connectToMongoDb } = require('./connection')
const Path = require('path');
const userRoute = require('./routes/user');
// const { restrictToLoggedinUserOnly, checkAuth } = require('./middlewares/auth');


const app = express();
const Port = 8002;

app.set("view engine", 'ejs')
app.set("views", Path.resolve('./views'))

connectToMongoDb('mongodb://127.0.0.1:27017/short-url').then(() => console.log("MongoDb connected..."))

app.use(express.json())
app.use(express.urlencoded({extended : false}))
app.use(cookieParser())

app.use("/", staticRoute) //checkAuth -> removed
app.use('/api/user',userRoute) // 1
app.use("/api/url",urlRoute) //restrictToLoggedinUserOnly,

app.get('/api/info',(req,res)=>{
    const userData = {
        name:"Aditya Sawant",
        age: 22
    }
    res.send(userData)
})

app.listen(Port, ()=> console.log(`Server started as @${Port}`))