import axios from "axios"

function TaskForm({showForm, setShowForm}){


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
            await axios.post("http://localhost:5000/api/tasks", task)
            console.log("Task added successfully")
        }catch(err){
            throw new Error(err.message)
        }
        
        setShowForm(!showForm)
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
                            <input id="task" name="taskName" type="text" required/>  
                        </div>
                        <div className="form-row">
                            <label htmlFor="description">Task Description</label>
                            <input id="description" name="taskDescription" type="text" required/>  
                        </div>
                        <div className="form-row">
                            <label htmlFor="due-date">Due Date</label>
                            <input id="due-date" name="dueDate" type="date" required />
                        </div>
                        <div className="form-row">
                            <label htmlFor="due-time">Due Time</label>
                            <input id="due-time" name="dueTime" type="time" required/>
                        </div>
                        <div className="form-buttons">
                            <button id="cancel" onClick={()=>setShowForm(!showForm)}>Cancel</button>
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