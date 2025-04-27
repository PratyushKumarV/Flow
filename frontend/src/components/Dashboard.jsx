import { useState, useEffect } from "react"
import TaskEntry from "./TaskEntry"
import Title from "./Title"
import TaskForm from "./TaskForm"
import FormContext from "../context/FormContext"
import axios from "axios"

function Dashboard(){

    const [showForm, setShowForm]=useState(false)
    const [tasks, setTasks]=useState([])

    async function fetchTasks(){ //function for useEffect
        const response=await axios.get("http://localhost:5000/api/tasks")
        let taskData=response.data
        setTasks(taskData.map(({taskName, taskDescription, dueDate, dueTime, status})=>{
            return <TaskEntry taskName={taskName} taskDescription={taskDescription} dueDate={dueDate} dueTime={dueTime} status={status} />
        }))
    }

    useEffect(()=>{
        fetchTasks()
    }, [showForm])

    const date=new Date()
    const emojiList=['🌄', '🌅', '🌤️', '⛅', '🌞', '🌟', '☀️']
    const emoji=emojiList[date.getDay()]

    return (

        <>
            <FormContext.Provider value={{showForm, setShowForm}}>
                {showForm ? <TaskForm/> : null}
                <Title />
                <div className="dashboard-wrapper">
                    <div className="dashboard">
                        <div className="dashboard-main">
                            <div className="dashboard-main-today-wrapper">
                                <div className="dashboard-main-today-container">
                                    <div className="dashboard-main-day">
                                        {date.toLocaleString('en-us', {weekday:'long'})}
                                    </div>
                                    <div className="dashboard-main-date">
                                        {date.toLocaleString('en-IN', {month:'long'})} {""}
                                        {date.toLocaleString('en-IN', {day:'2-digit'})} {", "}
                                        {date.toLocaleString('en-IN', {year:'numeric'})}
                                    </div>
                                </div>
                                <div className="dashboard-main-day-icon">
                                    {emoji}
                                </div>
                            </div>
                            <div className="dashboard-main-options">
                                <div className="dashboard-main-options-due">
                                    #4 Tasks due today
                                </div>
                                <div className="dashboard-main-options-new">
                                    <button id="new-task" onClick={()=>setShowForm(!showForm)}>
                                        New +
                                    </button>
                                </div>
                                <div className="dashboard-main-options-filter">
                                    <select id="filter-tasks">
                                        <option>Filter</option>
                                    </select>
                                </div>
                            </div>
                        </div>
                        <div className="tasks-wrapper">
                            {tasks}
                        </div>
                    </div>
                </div>

            </FormContext.Provider>
        </>
    )
}

export default Dashboard