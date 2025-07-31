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

async function loginUser(req, res){
    try{
        const {username, password}=req.body
        const checkUser=await User.findOne({userName: username})
        if(checkUser){
            const hashedPassword=checkUser.password
            const isMatch=await bcrypt.compare(password, hashedPassword)
            if (isMatch){
                 //JWT generation logic
                res.status(200).json({message: "Password is matched"})
            }else{
                res.status(401).json({message: "Invalid Password"})
            }
        }else{
            res.status(404).json({message: "User does not exist"})
        }
    }catch(err){
        res.status(500).json({message:"Internal Server Error"})
    }
}

module.exports={registerUser, loginUser}