import axios from "axios";

const devUrl=import.meta.env.VITE_DEV_URL
const prodUrl=import.meta.env.VITE_PROD_URL

const apiUrl=import.meta.env.MODE==="development"?devUrl:prodUrl

const api=axios.create({baseURL: apiUrl})

api.interceptors.request.use((config)=>{
    const token=localStorage.getItem("token")
    if (token){ // the Authorization header is added only when the token is available
        config.headers.Authorization=`Bearer ${token}`
    }
    return config // control resumes in the try block
})

api.interceptors.response.use(
    (response)=>response,
    (error)=>{
        if (error.response?.status==401){ // if there is a response for the error and if the status is 401 (invalid token)
            localStorage.removeItem("token")
            localStorage.setItem("sessionExpired", "1")
            window.location.href="/login" // redirect to the login page
        }
        return Promise.reject(error) // control goes to the catch block
    }
)

export default api