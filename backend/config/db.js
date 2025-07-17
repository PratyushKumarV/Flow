const mongoose=require("mongoose")

const connectionString=process.env.MONGODB_URI
const connectionStringDev=process.env.MONGODB_URI_DEV // temp connection string for development purposes

async function connectDB(){
    try{
        await mongoose.connect(connectionStringDev)
        console.log("Successfully connected to MongoDB")
    }catch(err){
        throw new Error(err.message)
    }
}

module.exports=connectDB