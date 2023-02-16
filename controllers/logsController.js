
const express=require("express")

const logs=express.Router()

const{getAllLogs,getOneLog,deleteOneLog,updateLog,createLog,getMonthlyLog,getWeeklyLog}=require("../queries/logs")

logs.get("/",async (req,res)=>{
    const AllLogs=await getAllLogs()
    res.json(AllLogs)
})

logs.get("/weekly-log", async (req,res)=>{
    try {
        const weeklyLog=await getWeeklyLog()
        res.send(weeklyLog)
    } catch (error) {
        console.log(error)
    }
})

logs.get("/monthly-log", async (req,res)=>{
    try {
        const monthlyLog=await getMonthlyLog()
        res.send(monthlyLog)
    } catch (error) {
        console.log(error)
    }
})


logs.get('/:id', async (req,res)=>{
    const {id}=req.params
    const oneLog=await getOneLog(id)
    res.json(oneLog)
})


logs.delete("/:id",async(req,res)=>{
    const {id}=req.params
    const deleted=await deleteOneLog(id)
    res.json(deleted)
})

logs.put("/:id",async(req,res)=>{
    const {id}=req.params
    const updatedLog=await updateLog(id,req.body)
    res.json(updatedLog)
})

logs.post("/", async(req,res)=>{
    const newPost=await createLog(req.body)
    res.json(newPost)
})




module.exports=logs