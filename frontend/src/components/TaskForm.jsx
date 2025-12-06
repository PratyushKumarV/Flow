import axios from "axios"
import styles from "../styles/dashboard.module.css"

function TaskForm(props){

    const devUrl=import.meta.env.VITE_DEV_URL
    const prodUrl=import.meta.env.VITE_PROD_URL

    const apiUrl=import.meta.env.MODE==="development"?devUrl:prodUrl

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
                const response=await axios.post(`${apiUrl}/api/tasks`, task)
                console.log(response.data.message)
            }else{
                const response=await axios.put(`${apiUrl}/api/tasks/${update._id}`, task)
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
                            <input id="task" name="taskName" type="text" required defaultValue={update ? update.taskName : null}/>  
                        </div>
                        <div className={styles["form-row"]}>
                            <label htmlFor="description">Task Description</label>
                            <input id="description" name="taskDescription" type="text" required defaultValue={update ? update.taskDescription : null}/>  
                        </div>
                        <div className={styles["form-row"]}>
                            <label htmlFor="due-date">Due Date</label>
                            <input id="due-date" name="dueDate" type="date" required defaultValue={update ? new Date(update.dueDate).toISOString().split('T')[0]  : null} />
                        </div>
                        <div className={styles["form-row"]}>
                            <label htmlFor="due-time">Due Time</label>
                            <input id="due-time" name="dueTime" type="time" required defaultValue={update ? update.dueTime : null}/>
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