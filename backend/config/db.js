const mongoose=require("mongoose")

const connectionString=process.env.MONGODB_URI

async function connectDB(){
    try{
        await mongoose.connect(connectionString)
        console.log("Successfully connected to MongoDB")
    }catch(err){
        throw new Error(err.message)
    }
}

module.exports=connectDB