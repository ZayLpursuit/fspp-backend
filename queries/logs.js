const db = require("../db/dbConfig.js")

const getAllLogs= async()=>{

try {
    const log=await db.any("SELECT * FROM calories")
    return (log)
    
} catch (error) {
    console.log(error)
}
}


const getOneLog= async (id)=>{
    try {
        const oneLog= await db.one("SELECT * FROM calories WHERE id=$1",id)
        return oneLog
    } catch (error) {
        console.log(error)
    }
}

const deleteOneLog= async(id)=>{
try {
    const deletedLog= await db.one("DELETE FROM calories WHERE id=$1",id)
    return deletedLog
} catch (error) {
    console.log(error)
}
}

const updateLog=async (id,log)=>{

    try {
        const updatedLog=await db.one("UPDATE calories SET name=$1, fiber=$2, protein=$3,sugar=$4,carbs=$5,fat=$6 WHERE id=$7 RETURNING *",[log.name,log.fiber,log.protein,log.sugar,log.carbs,log.fat,id])
        return updatedLog
    } catch (error) {
        console.log(error)
    }
}

const createLog=async (log)=>{
    const cal=calculateCalories(log.fiber,log.protein,log.sugar,log.carbs,log.fat)
    try {
        const createdLog=await db.one("INSERT INTO calories (name, fiber, protein,sugar,carbs,fat,calories) VALUES($1,$2,$3,$4,$5,$6,$7) RETURNING *",[log.name,log.fiber,log.protein,log.sugar,log.carbs,log.fat,cal] )

        

        return createdLog
    } catch (error) {
        console.log(error)
    }
}

function calculateCalories(f,p,s,c,fa){
    let calories =(2*f)+ (4*p) + (4*s) + (23*c) + (9*fa)
    return calories
}

const getWeeklyLog=async ()=>{
    try {
        
        const weeklyLog=await db.any("SELECT * FROM calories WHERE dte > current_date -interval '7 days'")

        return weeklyLog
    } catch (error) {
        console.log(error)
    }
}

const getMonthlyLog=async ()=>{
    try {
        
        const monthlyLog=await db.any("SELECT * FROM calories WHERE dte > current_date-interval '1 month' ")

        return monthlyLog
    } catch (error) {
        console.log(error)
    }
}

module.exports={getAllLogs,getOneLog,deleteOneLog,updateLog,createLog,calculateCalories,getMonthlyLog,getWeeklyLog}