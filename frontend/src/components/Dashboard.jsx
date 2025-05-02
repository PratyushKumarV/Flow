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
    const [count, setCount]=useState(0) // to display number of tasks due in the current day
    const [filter, setFilter]=useState("Pending")

    function handleFilter(event){
        setFilter(event.target.value)
    }

    async function fetchTasks(){ //function for useEffect
        try{
            const response=await axios.get("http://localhost:5000/api/tasks")
            let taskData=response.data
            setTasks(
                taskData.filter((entry)=>{
                    if(filter=="All"){
                        return true
                    }else if(filter=="Pending"){
                        return entry.status=="Pending"
                    }else{
                        return entry.status=="Completed"
                    }
                }).map((entry)=>{
                return  <TaskEntry key={entry._id} {...entry} refresh={refresh} setRefresh={setRefresh} setUpdate={setUpdate} setShowForm={setShowForm}/> 
            }))
            setCount(()=>{
                const array=taskData.filter((entry)=>{
                    return new Date(entry.dueDate).setHours(0, 0, 0, 0)===new Date().setHours(0 ,0, 0, 0) && entry.status=="Pending" // doesn't compare time
                })
                return array.length //returns length of the array containing the tasks due today
            })
                
        }catch(err){
            throw new Error(err.message)
        }
    }

    useEffect(()=>{
        fetchTasks()
    }, [showForm, refresh, filter])

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
                                    #{count} Tasks due today
                                </div>
                                <div className="dashboard-main-options-new">
                                    <button id="new-task" onClick={()=>setShowForm(true)}>
                                        New +
                                    </button>
                                </div>
                                <div className="dashboard-main-options-filter">
                                    <select id="filter-tasks" value={filter} onChange={handleFilter}> {/* Controlled Component. Here though it isn't necessary   */}
                                        <option value="All">All</option>
                                        <option value="Completed">Completed</option>
                                        <option value="Pending">Pending</option> {/* By default all pending tasks are displayed */}
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