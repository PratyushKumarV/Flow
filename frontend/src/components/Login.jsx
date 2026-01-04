import api from "../axiosSetup";
import Authentication from "./Authentication";
import styles from "../styles/authentication.module.css"
import { useNavigate } from "react-router-dom";
import { useState } from "react";

function Login(){
    const [message, setMessage]=useState(null)
    const sessionExpired=localStorage.getItem("sessionExpired")

    const navigate=useNavigate()

    async function login(formData){
        const username=formData.get("userName")
        const password=formData.get("password")
        const user={
            "username": username,
            "password": password
        }

        try{
            const response=await api.post(`/api/auth/login`, user)
            localStorage.setItem("token", response.data.token)
            localStorage.removeItem("sessionExpired")
            navigate("/dashboard")
        }catch(err){
            setMessage("Authentication failed")
        }

    }

    return (
        <>
            <Authentication title="Login">
                <form action={login}>
                    {sessionExpired==='1'?
                    <div className={styles["form-row"]}>
                        <p>Session Expired</p>
                    </div>:null}
                    <div className={styles["form-row"]}>
                        <label htmlFor="username">Username</label>
                        <input id="username" type="text" name="userName" required/>
                    </div>
                    <div className={styles["form-row"]}>
                        <label htmlFor="password">Password</label>
                        <input id="password" type="password" name="password" required/>
                    </div>
                    <div className={styles["form-buttons"]}>
                        <button type="submit">Submit</button>
                    </div>
                    {
                        message!=null?
                        <div className={styles["form-row"]}>
                            <p>{message}</p>
                        </div>:null
                    }
                    <div className={styles["form-row"]}>
                        <p onClick={()=>navigate("/signup")}>Don't have an account? Sign Up</p>
                    </div>
                </form>
            </Authentication>   
        </>
    )
}

export default Login