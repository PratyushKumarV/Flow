const Task=require("../models/task")


async function addTask(req, res){
    try{
        const newTask=new Task(req.body)
        const saveTask=await newTask.save()
        res.status(200).json({message: "successful", data: saveTask})
    }catch(err){
        throw new Error(err.message)
    }
}

module.exports=addTask