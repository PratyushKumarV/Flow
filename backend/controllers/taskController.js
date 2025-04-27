const Task=require("../models/task")


async function addTask(req, res){
    try{
        const newTask=new Task(req.body)
        const saveTask=await newTask.save()
        res.status(200).json({message: "Task Added Successfully", data: saveTask})
    }catch(err){
        throw new Error(err.message)
    }
}

async function getTask(req, res){
    try{
        const tasks=await Task.find({})
        res.status(200).json(tasks)
    }catch(err){
        throw new Error(err.message)
    }
}

module.exports={addTask, getTask}