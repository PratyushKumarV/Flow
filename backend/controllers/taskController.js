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

async function deleteTask(req, res){
    try{
        const {id}=req.params
        const result=await Task.deleteOne({_id:id})
        res.status(200).json({message: "Task deleted successfully", data:result})
    }catch(err){
        throw new Error(err.message)
    }
}

async function updateStatus(req, res){
    try{
        const {id, status}=req.query
        const filter={ _id:id }
        const update={ status: status }
        const doc=await Task.findOneAndUpdate(filter, update, {new : true}) // new parameter returns the document after updation
        res.status(200).json({message: "Task status changed", data:doc})
    }catch(err){
        throw new Error(err.message)
    }
}

async function updateTask(req, res){
    try{
        const {id}=req.params
        const filter={_id:id}
        const doc=await Task.findOneAndUpdate(filter, req.body, {new : true, upsert : true})
        res.status(200).json({message: "Task updated", data:doc})
    }catch(err){
        throw new Error(err.message)
    }
}

module.exports={addTask, getTask, deleteTask, updateStatus, updateTask}