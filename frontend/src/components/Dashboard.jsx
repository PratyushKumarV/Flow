import { useState, useEffect } from "react"
import styles from "../styles/dashboard.module.css"
import TaskEntry from "./TaskEntry"
import Title from "./Title"
import TaskForm from "./TaskForm"
import api from "../axiosSetup"

function Dashboard(){

    const [showForm, setShowForm]=useState(false)
    const [tasks, setTasks]=useState([])
    const [refresh, setRefresh]=useState(false)
    const [update, setUpdate]=useState(null) //update state will store the task entry details which is drilled as props to showForm
    const [count, setCount]=useState(0) // to display number of tasks due in the current day
    const [filter, setFilter]=useState("All")

    function handleFilter(event){
        setFilter(event.target.value)
    }

    async function fetchTasks(){ //function for useEffect
        try{
            const response=await api.get(`/api/tasks/`)
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
                <div className={styles["body-wrapper"]}>
                    {showForm ? <TaskForm setShowForm={setShowForm} update={update} setUpdate={setUpdate}/> : null}
                    <Title />
                    <div className={styles["dashboard-wrapper"]}>
                        <div className={styles["dashboard"]}>
                            <div className={styles["dashboard-main"]}>
                                <div className={styles["dashboard-main-today-wrapper"]}>
                                    <div className={styles["dashboard-main-today-container"]}>
                                        <div className={styles["dashboard-main-day"]}>
                                            {date.toLocaleString('en-us', {weekday:'long'})}
                                        </div>
                                        <div className={styles["dashboard-main-date"]}>
                                            {date.toLocaleString('en-IN', {month:'long'})} {""}
                                            {date.toLocaleString('en-IN', {day:'2-digit'})} {", "}
                                            {date.toLocaleString('en-IN', {year:'numeric'})}
                                        </div>
                                    </div>
                                    <div className={styles["dashboard-main-day-icon"]}>
                                        {emoji}
                                    </div>
                                </div>
                                <div className={styles["dashboard-main-options"]}>
                                    <div className={styles["dashboard-main-options-due"]}>
                                        #{count} Tasks due today
                                    </div>
                                    <div className={styles["dashboard-main-options-new"]}>
                                        <button id={styles["new-task"]} onClick={()=>setShowForm(true)}>
                                            New +
                                        </button>
                                    </div>
                                    <div className={styles["dashboard-main-options-filter"]}>
                                        <select id={styles["filter-tasks"]} value={filter} onChange={handleFilter}> {/* Controlled Component. Here though it isn't necessary   */}
                                            <option value="All">All</option>
                                            <option value="Completed">Completed</option>
                                            <option value="Pending">Pending</option> {/* By default all pending tasks are displayed */}
                                        </select>
                                    </div>
                                </div>
                            </div>
                            <div className={styles["tasks-wrapper"]}>
                                {tasks}
                            </div>
                        </div>
                    </div>

                </div>
                
        </>
    )
}

export default Dashboard