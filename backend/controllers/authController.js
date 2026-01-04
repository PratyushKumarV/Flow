const User=require("../models/user")
const bcrypt=require("bcrypt")
const jwt=require("jsonwebtoken")

async function registerUser(req, res){
    try{
        const {username, password}=req.body
        const duplicateUsername=await User.findOne({userName: username})
        if(duplicateUsername){
            return res.status(409).json({message:"Username already exists"})
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

            const token = jwt.sign({userId: newUser._id}, process.env.JWT_SECRET, {expiresIn: '1h'})
            return res.status(200).json({message: "User created successfully", token:token})
        }   
    }catch(err){
        return res.status(500).json({message:"Internal Server Error"})
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
                const token = jwt.sign({userId: checkUser._id}, process.env.JWT_SECRET, {expiresIn: '1h'})
                return res.status(200).json({message: "Password is matched", token: token})
            }else{
                return res.status(401).json({message: "Incorrect Password"})
            }
        }else{
            return res.status(404).json({message: "User does not exist"})
        }
    }catch(err){
        console.log(err)
        return res.status(500).json({message:"Internal Server Error"})
    }
}

module.exports={registerUser, loginUser}