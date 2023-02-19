
const express=require("express")

const logs=express.Router()

const{getAllLogs,getOneLog,deleteOneLog,updateLog,createLog,getMonthlyLog,getWeeklyLog}=require("../queries/logs")

logs.get("/",async (req,res)=>{

    const AllLogs=await getAllLogs()
    if(AllLogs[0]){
    res.json(AllLogs)
    }
    else{
        res.status(500).json({error:"server error"})
    }
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
    if (oneLog){
    res.json(oneLog)
    }
    else{
        res.status(400).json({error:"Log not found"})
    }
})


logs.delete("/:id",async(req,res)=>{
    const {id}=req.params
    const deleted=await deleteOneLog(id)
    if(deleted){
    res.json(deleted)}
    else{
        res.status(500).json({error:"not found"})
    }
})

logs.put("/:id",async(req,res)=>{
    const {id}=req.params

    const updatedLog=await updateLog(id,req.body)
    if(updatedLog[id]){
    res.json(updatedLog)}
    else{
        res.status(400).json("Not found")
    }
})

logs.post("/", async(req,res)=>{

    try {
            const newPost=await createLog(req.body)
    res.json(newPost)
    } catch (error) {
        res.status(500).json({error:"Internal Error"})
    }

})




module.exports=logs