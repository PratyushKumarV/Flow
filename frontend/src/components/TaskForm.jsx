import { useContext } from "react"
import FormContext from "../context/FormContext"

function TaskForm(){

    const {showForm, setShowForm}=useContext(FormContext)

    return (
        <>
            <div className="task-form-wrapper">
                <div className="task-form-spacing-above" />
                <div className="task-form-container">
                    <h1 className="task-form-heading">
                        Task
                    </h1>
                    <form className="task-form">
                        <div  className="form-row">
                            <label htmlFor="task">Task Name</label>
                            <input id="task" type="text"/>  
                        </div>
                        <div className="form-row">
                            <label htmlFor="description">Task Description</label>
                            <input id="description" type="text"/>  
                        </div>
                        <div className="form-row">
                            <label htmlFor="due-date">Due Date</label>
                            <input id="due-date" type="date" />
                        </div>
                        <div className="form-row">
                            <label htmlFor="due-time">Due Time</label>
                            <input id="due-time" type="time" />
                        </div>
                        <button onClick={()=>setShowForm(!showForm)}>Submit</button> {/* Temp button for testing */}
                    </form>
                </div>
                <div className="task-form-spacing-below" />
            </div>
        </>
    )
}

export default TaskForm