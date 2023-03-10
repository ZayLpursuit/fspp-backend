const express=require("express")

const app=express()
const cors = require("cors");
app.use(cors());


app.use(express.json())

const logsController=require("./controllers/logsController")


app.use("/logs",logsController)

app.get("/",(req,res)=>{
    res.send("welcome")
})

app.get("*",(req,res)=>{
    res.send("Page Not Found")
})

module.exports=app