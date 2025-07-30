const User=require("../models/user")
const bcrypt=require("bcrypt")

async function registerUser(req, res){
    try{
        const {username, password}=req.body
        const duplicateUsername=await User.findOne({userName: username})
        if(duplicateUsername){
            res.status(409).json({message:"Username already exists"})
            return
        }else{
            const saltRounds=10 // specifies that hashing must be performed 2^10 times

            //generate salt
            const salt=await bcrypt.genSalt(saltRounds)

            //hash
            const hashedPassword=await bcrypt.hash(password, salt)
            
            const newUser=new User({
                userName: username,
                password: hashedPassword
            })
            await newUser.save()
            res.status(200).json({message: "User created successfully"})

        }   
    }catch(err){
        res.status(500).json({message:"Internal Server Error"})
    }
}

module.exports={registerUser}