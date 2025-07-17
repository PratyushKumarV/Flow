import styles from "../styles/dashboard.module.css"
function Title(){
    return (
        <>
            <div className={styles["title-wrapper"]}>
                <div className={styles["title"]}>
                    FLOW
                </div>
            </div>
        </>
    )
}

export default Title