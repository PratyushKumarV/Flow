const mongoose=require("mongoose")
const { Schema }=mongoose

const taskSchema=mongoose.Schema({
    taskName: {type: String, required: true},
    taskDescription: {type: String, required: true},
    dueDate: {type: Date, required: true},
    dueTime: {type: String, required: true},
    status: {type: String, required: true},
    userId: {type: Schema.Types.ObjectId, ref:"User", required: true}
},{
    collection: "tasks"
})

const Task=mongoose.model("tasks", taskSchema)

module.exports=Task