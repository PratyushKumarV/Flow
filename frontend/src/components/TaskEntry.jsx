import time from "../assets/images/time-968.png"
import trash from "../assets/images/trash-can.png"

function Task(props){

    return (
        <div className="task-entry">
            <div className="task-info-wrapper">
                <div className="task-info">
                    <div className="task-name">
                        {props.name}
                    </div>
                    <div className="task-description">
                        {props.description}
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
                <img src={time}/><span>Today, {props.time}</span>
            </div>
        </div>
    )
}

export default Task;