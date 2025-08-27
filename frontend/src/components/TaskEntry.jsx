import time from "../assets/images/time-968.png"
import trash from "../assets/images/trash-can.png"
import axios from "axios"
import styles from "../styles/dashboard.module.css"

function TaskEntry(props){

    const devUrl=import.meta.env.VITE_DEV_URL
    const prodUrl=import.meta.env.VITE_PROD_URL

    const apiUrl=import.meta.env.MODE==="development"?devUrl:prodUrl
    
    const dueDate=new Date(props.dueDate)
    const {refresh, setRefresh, setUpdate, setShowForm}=props

    async function deleteTask(){
        try{
            const response=await axios.delete(`${apiUrl}/api/tasks/${props._id}`)
            console.log(response.data.message)
            setRefresh(!refresh)
        }catch(err){
            throw new Error(err.message)
        }
    }

    async function updateStatus(status){
        try{
            const response=await axios.patch(`${apiUrl}/api/tasks/query?id=${props._id}&status=${status}`)
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
        <div className={styles["task-entry"]}>
            <div className={styles["task-info-wrapper"]}>
                <div className={styles["task-info"]}>
                    <div className={styles["task-name"]}>
                        {props.status=="Completed"?<del>{props.taskName}</del>:props.taskName}
                    </div>
                </div>
                <div className={styles["task-options"]}>
                    {props.status=="Completed"?<button onClick={()=>updateStatus("Pending")}>Mark as Pending</button>:<button id={styles["completed"]} onClick={()=>updateStatus("Completed")}>Done</button>}
                    {props.status=="Completed"?null:<button id={styles["edit"]} onClick={editTask}>Edit</button>}
                    <button id={styles["delete"]} onClick={deleteTask}>
                        <img src={trash} className={styles["delete-task"]}/>
                    </button>
                </div>
            </div>
            <div className={styles["task-description"]}>
                {props.status=="Completed"?<del>{props.taskDescription}</del>:props.taskDescription}
            </div>
            <div className={styles["task-due"]}>
                <img src={time}/><span>{dueDate.toLocaleDateString('en-IN')}, {props.dueTime}</span>
            </div>
        </div>
    )
}

export default TaskEntry;