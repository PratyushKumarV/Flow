import { useState } from "react"
import TaskEntry from "./TaskEntry"
import Title from "./Title"
import TaskForm from "./TaskForm"
import FormContext from "../context/FormContext"

function Dashboard(){

    const [showForm, setShowForm]=useState(false)

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
                            <TaskEntry name="Interview" description="@ Google" time="10:20 am to 11:20 am"/>
                            <TaskEntry />
                            <TaskEntry />
                            <TaskEntry />
                        </div>
                    </div>
                </div>

            </FormContext.Provider>
        </>
    )
}

export default Dashboard