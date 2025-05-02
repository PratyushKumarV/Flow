import time from "../assets/images/time-968.png"
import trash from "../assets/images/trash-can.png"
import axios from "axios"

function TaskEntry(props){
    
    const dueDate=new Date(props.dueDate)
    const {refresh, setRefresh, setUpdate, setShowForm}=props

    async function deleteTask(){
        try{
            const response=await axios.delete(`http://localhost:5000/api/tasks/${props._id}`)
            console.log(response.data.message)
            setRefresh(!refresh)
        }catch(err){
            throw new Error(err.message)
        }
    }

    async function updateStatus(status){
        try{
            const response=await axios.patch(`http://localhost:5000/api/tasks/query?id=${props._id}&status=${status}`)
            console.log(response.data.message)
            setRefresh(!refresh)
        }catch(err){
            throw new Error(err.message)
        }
    }

    async function editTask(){
        try{
            setUpdate(props)
            setShowForm(true)
        }catch(err){
            throw new Error(err.message)
        }
    }

    return (
        <div className="task-entry">
            <div className="task-info-wrapper">
                <div className="task-info">
                    <div className="task-name">
                        {props.status=="Completed"?<del>{props.taskName}</del>:props.taskName}
                    </div>
                    <div className="task-description">
                        {props.status=="Completed"?<del>{props.taskDescription}</del>:props.taskDescription}
                    </div>
                </div>
                <div className="task-options">
                    {props.status=="Completed"?<button onClick={()=>updateStatus("Pending")}>Mark as Pending</button>:<button id="completed" onClick={()=>updateStatus("Completed")}>Done</button>}
                    {props.status=="Completed"?null:<button id="edit" onClick={editTask}>Edit</button>}
                    <button id="delete" onClick={deleteTask}>
                        <img src={trash} className="delete-task"/>
                    </button>
                </div>
            </div>
            <div className="task-due">
                <img src={time}/><span>{dueDate.toLocaleDateString('en-IN')}, {props.dueTime}</span>
            </div>
        </div>
    )
}

export default TaskEntry;