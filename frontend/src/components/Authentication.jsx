import styles from "../styles/authentication.module.css"

function Authentication(){
    return (
        <>
            <div className={styles["auth-container"]}>
                <div className={styles["auth-child-greet"]}>
                    <h1>Welcome to Flow!</h1>
                    <p>Productivity meets style 😎</p>
                </div>
                <div className={styles["auth-child-login"]}>
                    <h1>Sign In</h1>
                </div>
            </div>
        </>
    )
}

export default Authentication