import axios from "axios"
import styles from "../styles/dashboard.module.css"

function TaskForm(props){

    const {setShowForm, update, setUpdate}=props

    async function submitTask(formData){
        const taskName=formData.get("taskName")
        const taskDescription=formData.get("taskDescription")
        const dueDate=formData.get("dueDate")
        const dueTime=formData.get("dueTime")
        const task={
            "taskName":taskName,
            "taskDescription":taskDescription,
            "dueDate":dueDate,
            "dueTime":dueTime,
            "status":"Pending"
        }

        try{
            if(!update){
                const response=await axios.post("https://flow-kn3b.onrender.com/api/tasks", task)
                console.log(response.data.message)
            }else{
                const response=await axios.put(`https://flow-kn3b.onrender.com/api/tasks/${update._id}`, task)
                console.log(response.data.message)
                setUpdate(null)
            }
            
        }catch(err){
            throw new Error(err.message)
        }
        
        setShowForm(false)
    }

    return (
        <>
            <div className={styles["task-form-wrapper"]}>
                <div className={styles["task-form-spacing-above"]} />
                <div className={styles["task-form-container"]}>
                    <h1 className={styles["task-form-heading"]}>
                        Task
                    </h1>
                    <form className={styles["task-form"]} action={submitTask}>
                        <div  className={styles["form-row"]}>
                            <label htmlFor="task">Task Name</label>
                            <input id={styles["task"]} name="taskName" type="text" required defaultValue={update ? update.taskName : null}/>  
                        </div>
                        <div className={styles["form-row"]}>
                            <label htmlFor="description">Task Description</label>
                            <input id={styles["description"]} name="taskDescription" type="text" required defaultValue={update ? update.taskDescription : null}/>  
                        </div>
                        <div className={styles["form-row"]}>
                            <label htmlFor="due-date">Due Date</label>
                            <input id={styles["due-date"]} name="dueDate" type="date" required defaultValue={update ? new Date(update.dueDate).toISOString().split('T')[0]  : null} />
                        </div>
                        <div className={styles["form-row"]}>
                            <label htmlFor="due-time">Due Time</label>
                            <input id={styles["due-time"]} name="dueTime" type="time" required defaultValue={update ? update.dueTime : null}/>
                        </div>
                        <div className={styles["form-buttons"]}>
                            <button id={styles["cancel"]} onClick={()=>setShowForm(false)}>Cancel</button>
                            <button id={styles["submit"]} type="submit">Save</button>
                        </div>
                    </form>
                </div>
                <div className={styles["task-form-spacing-below"]} />
            </div>
        </>
    )
}

export default TaskForm