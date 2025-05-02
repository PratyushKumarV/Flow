import axios from "axios"

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
            <div className="task-form-wrapper">
                <div className="task-form-spacing-above" />
                <div className="task-form-container">
                    <h1 className="task-form-heading">
                        Task
                    </h1>
                    <form className="task-form" action={submitTask}>
                        <div  className="form-row">
                            <label htmlFor="task">Task Name</label>
                            <input id="task" name="taskName" type="text" required defaultValue={update ? update.taskName : null}/>  
                        </div>
                        <div className="form-row">
                            <label htmlFor="description">Task Description</label>
                            <input id="description" name="taskDescription" type="text" required defaultValue={update ? update.taskDescription : null}/>  
                        </div>
                        <div className="form-row">
                            <label htmlFor="due-date">Due Date</label>
                            <input id="due-date" name="dueDate" type="date" required defaultValue={update ? new Date(update.dueDate).toISOString().split('T')[0]  : null} />
                        </div>
                        <div className="form-row">
                            <label htmlFor="due-time">Due Time</label>
                            <input id="due-time" name="dueTime" type="time" required defaultValue={update ? update.dueTime : null}/>
                        </div>
                        <div className="form-buttons">
                            <button id="cancel" onClick={()=>setShowForm(false)}>Cancel</button>
                            <button id="submit" type="submit">Save</button>
                        </div>
                    </form>
                </div>
                <div className="task-form-spacing-below" />
            </div>
        </>
    )
}

export default TaskForm