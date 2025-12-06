import axios from "axios";
import Authentication from "./Authentication";
import styles from "../styles/authentication.module.css"

function SignUp(){

    const devUrl=import.meta.env.VITE_DEV_URL
    const prodUrl=import.meta.env.VITE_PROD_URL

    const apiUrl=import.meta.env.MODE==="development"?devUrl:prodUrl

    async function register(formData){
        const username=formData.userName
        const password=formData.password
        const user={
            "username": username,
            "password": password
        }

        try{
            const response=await axios.post(`${apiUrl}/api/auth/register`, user)
            console.log(response.data.message)
        }catch(err){
            throw new Error(err.message)
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
                    <div className={styles["form-buttons"]}>
                        <button type="submit">Submit</button>
                    </div>
                </form>
            </Authentication>
        </>
    ) 
}

export default SignUp