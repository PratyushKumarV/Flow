const jwt=require("jsonwebtoken")

function auth(req, res, next){
    const header=req.headers.authorization
    if (!header || !header.startsWith("Bearer ")){
        return res.status(401).json({message: "No token"})
    }

    const token=header.split(" ")[1];

    // JWT verification
    try{
        const payload=jwt.verify(token, process.env.JWT_SECRET)
        req.user={userId: payload.userId}
        return next() // to move to the next middleware function or the route handler
    }catch(err){
        return res.status(401).json({message: "Invalid token"})
    }
}

module.exports=auth