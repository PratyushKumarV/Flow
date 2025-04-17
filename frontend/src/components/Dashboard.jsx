function Dashboard(){

    const date=new Date()
    const emojiList=['🌄', '🌅', '🌤️', '⛅', '🌞', '🌟', '☀️']
    const emoji=emojiList[date.getDay()]

    return (
        <>
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
                                <button>
                                    New +
                                </button>
                            </div>
                            <div className="dashboard-main-options-filter">
                                <select>
                                    <option>Filter</option>
                                </select>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div className="tasks-wrapper">

            </div>

        </>
    )
}

export default Dashboard