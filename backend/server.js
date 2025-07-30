const express=require("express")
const cors=require("cors")
require("dotenv").config()

const connectDB=require("./config/db")
const taskRoute=require("./routes/tasks")  
const userRoute=require("./routes/auth")

const PORT=process.env.PORT
const app=express()

app.use(cors({
    origin: ["http://localhost:5173","https://flow-three-black.vercel.app", "https://flow-pratyushkumarvs-projects.vercel.app/"],
    methods: ["GET", "POST", "PATCH", "PUT", "DELETE"],
    allowedHeaders: ["Content-Type"]
}))

app.use("/api/tasks", taskRoute)
app.use("/api/auth", userRoute)


async function server(){
    await connectDB();

    try{
        app.listen(PORT, ()=>{
            console.log("Server listening on port 5000...")
        })
    }catch(err){
        throw new Error(err.message)
    }
}

server()

