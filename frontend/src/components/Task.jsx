import time from "../assets/images/time-968.png"

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
                    <button>...</button>
                </div>
            </div>
            <div className="task-due">
                <img src={time}/><span>Today, {props.time}</span>
            </div>
        </div>
    )
}

export default Task;