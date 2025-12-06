import axios from "axios";
import Authentication from "./Authentication";

function Login(){

    const devUrl=import.meta.env.VITE_DEV_URL
    const prodUrl=import.meta.env.VITE_PROD_URL

    const apiUrl=import.meta.env.MODE==="development"?devUrl:prodUrl

    async function login(formData){
        const username=formData.userName
        const password=formData.password
        const user={
            "username": username,
            "password": password
        }

        try{
            const response=await axios.post(`${apiUrl}/api/auth/login`, user)
            console.log(response.data.message)
        }catch(err){
            throw new Error(err.message)
        }

    }

    return (
        <>
            <Authentication title="Login">
                <form action={login}>
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

export default Login