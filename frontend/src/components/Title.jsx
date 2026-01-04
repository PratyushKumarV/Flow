import styles from "../styles/dashboard.module.css"
import { useNavigate } from "react-router-dom"

function Title(){

    const navigate=useNavigate()

    function onLogout(){
        localStorage.removeItem("token")
        navigate("/login")
    }

    return (
        <>
            <div className={styles["header"]}>
                <div/> {/*This div is present purely to provide space*/}
                <div className={styles["center"]}>
                    FLOW
                </div>
                <button className={styles["logout"]} onClick={onLogout}>Logout</button>
            </div>
        </>
    )
}

export default Title