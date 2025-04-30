import time from "../assets/images/time-968.png"
import trash from "../assets/images/trash-can.png"
import axios from "axios"

function TaskEntry(props){
    
    const dueDate=new Date(props.dueDate)
    const refresh=props.refresh
    const setRefresh=props.setRefresh

    async function deleteTask(){
        try{
            const response=await axios.delete(`http://localhost:5000/api/tasks/${props.id}`)
            console.log(response.data.message)
            setRefresh(!refresh)
        }catch(err){
            throw new Error(err.message)
        }
    }

    async function finishTask(){
        try{
            const response=await axios.patch(`http://localhost:5000/api/tasks/${props.id}`)
            console.log(response.data.message)
            setRefresh(!refresh)
        }catch(err){
            throw new Error(err.message)
        }
    }

    return (
        <div className="task-entry">
            <div className="task-info-wrapper">
                <div className="task-info">
                    <div className="task-name">
                        {props.taskName}
                    </div>
                    <div className="task-description">
                        {props.taskDescription}
                    </div>
                </div>
                <div className="task-options">
                    <button id="completed" onClick={finishTask}>Done</button>
                    <button id="edit">Edit</button>
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

export default TaskEntry    ;