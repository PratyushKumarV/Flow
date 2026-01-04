import api from "../axiosSetup"
import Authentication from "./Authentication";
import styles from "../styles/authentication.module.css"
import { useNavigate } from "react-router-dom";
import { useState } from "react";

function SignUp(){
    const navigate=useNavigate()

    const [error, setError]=useState(null)

    async function register(formData){
        const username=formData.get("userName")
        const password=formData.get("password")
        const user={
            "username": username,
            "password": password
        }

        try{
            const response=await api.post(`/api/auth/register`, user)
            localStorage.setItem("token", response.data.token)
            localStorage.removeItem("sessionExpired")
            navigate("/dashboard")
        }catch(err){
            setError(true)
        }
    }

    return (
        <>
            <Authentication title="Sign Up">
                <form action={register}>
                    <div className={styles["form-row"]}>
                        <label htmlFor="username">Username</label>
                        <input id="username" type="text" name="userName" required/>
                    </div>
                    <div className={styles["form-row"]}>
                        <label htmlFor="password">Password</label>
                        <input id="password" type="password" name="password" required/>
                    </div>
                    {
                        error==true?
                        <div className={styles["form-row"]}>
                            <p>Username already exists</p>
                        </div>:null
                    }
                    <div className={styles["form-buttons"]}>
                        <button type="submit">Submit</button>
                    </div>
                </form>
            </Authentication>
        </>
    ) 
}

export default SignUp