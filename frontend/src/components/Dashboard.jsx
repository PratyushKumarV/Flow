import { useState, useEffect } from "react"
import TaskEntry from "./TaskEntry"
import Title from "./Title"
import TaskForm from "./TaskForm"
import axios from "axios"

function Dashboard(){

    const [showForm, setShowForm]=useState(false)
    const [tasks, setTasks]=useState([])
    const [refresh, setRefresh]=useState(false)
    const [update, setUpdate]=useState(null) //update state will store the task entry details which is drilled as props to showForm

    async function fetchTasks(){ //function for useEffect
        try{
            const response=await axios.get("http://localhost:5000/api/tasks")
            let taskData=response.data
            setTasks(taskData.map((entry)=>{
                return  entry.status=="Pending" &&  
                <TaskEntry key={entry._id} {...entry} refresh={refresh} setRefresh={setRefresh} setUpdate={setUpdate} setShowForm={setShowForm}/> 
            }))
        }catch(err){
            throw new Error(err.message)
        }
    }

    useEffect(()=>{
        fetchTasks()
    }, [showForm, refresh])

    const date=new Date()
    const emojiList=['🌄', '🌅', '🌤️', '⛅', '🌞', '🌟', '☀️']
    const emoji=emojiList[date.getDay()]

    return (

        <>
                {showForm ? <TaskForm setShowForm={setShowForm} update={update} setUpdate={setUpdate}/> : null}
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
                                    <button id="new-task" onClick={()=>setShowForm(true)}>
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

        </>
    )
}

export default Dashboard