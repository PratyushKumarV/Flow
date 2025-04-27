import time from "../assets/images/time-968.png"
import trash from "../assets/images/trash-can.png"

function TaskEntry(props){
    
    const dueDate=new Date(props.dueDate)

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
                    <button id="completed">Done</button>
                    <button id="edit">Edit</button>
                    <button id="delete">
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