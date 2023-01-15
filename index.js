
const express=require('express')
const app=express()
app.use(express.json())
const cors=require('cors')
app.use(cors())
require('dotenv').config()
const {connection}=require('./config/db')
const {registerRoute}=require('./Routes/user.Route')
const {loginRoute}=require('./Routes/login.Routes')
const {todoRoute}=require('./Routes/todo.Routes')

//routes are from here

app.use('/user', registerRoute)
app.use('/user', loginRoute)
//todo Routes starts from here
app.use("/todo", todoRoute)






app.listen(process.env.port, ()=>{
    try{
connection()
console.log(`server stand  by at ${process.env.port}`)
    }
    catch(err){
        console.log(err)
        resizeBy.send({"msg":"not able to connect to server"})
    }
})