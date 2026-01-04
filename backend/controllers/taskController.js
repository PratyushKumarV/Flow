const Task=require("../models/task")

async function addTask(req, res){
    try{
        const newTask=new Task({...req.body, userId: req.user.userId})
        const saveTask=await newTask.save()
        res.status(200).json({message: "Task Added Successfully", data: saveTask})
    }catch(err){
        return res.status(500).json({message: err.message})
    }
}

async function getTask(req, res){
    try{
        const tasks=await Task.find({userId: req.user.userId})
        res.status(200).json(tasks)
    }catch(err){
        return res.status(500).json({message: err.message})
    }
}

async function deleteTask(req, res){
    try{
        const {id}=req.params
        const result=await Task.deleteOne({userId: req.user.userId, _id:id})
        res.status(200).json({message: "Task deleted successfully", data:result})
    }catch(err){
        return res.status(500).json({message: err.message})
    }
}

async function updateStatus(req, res){
    try{
        const {id, status}=req.query
        const filter={ userId: req.user.userId, _id:id }
        const update={ status: status }
        const doc=await Task.findOneAndUpdate(filter, update, {new : true}) // new parameter returns the document after updation
        res.status(200).json({message: "Task status changed", data:doc})
    }catch(err){
        return res.status(500).json({message: err.message})
    }
}

async function updateTask(req, res){
    try{
        const {id}=req.params
        const filter={userId: req.user.userId, _id:id}
        const doc=await Task.findOneAndUpdate(filter, req.body, {new : true, upsert : false})
        res.status(200).json({message: "Task updated", data:doc})
    }catch(err){
        return res.status(500).json({message: err.message})
    }
}

module.exports={addTask, getTask, deleteTask, updateStatus, updateTask}