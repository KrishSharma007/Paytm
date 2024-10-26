const jwt=require("jsonwebtoken")
const JWT_SECRET = require("../config")
const authMiddleware=(req,res,next)=>{
    const authorizationHeader = req.headers.authorization;
    if (!authorizationHeader) {
        return res.status(403).json({
            error: "No authorization header provided."
        });
    }
    const parts = authorizationHeader.split(" ");
    if (parts.length !== 2 || parts[0] !== "Bearer") {
        return res.status(403).json({
            error: "Authorization header format must be 'Bearer <token>'"
        });
    }
    const token = parts[1];
    try {
        const decoded=jwt.verify(token, JWT_SECRET)
        if (decoded.userId) {
            req.userId=decoded.userId
            next()
        } else {
            return res.status(403).json({
                error: "Invalid token."
            });
        }
    } catch (error) {
        return res.status(403).json({
            error: "Invalid token."
        });
    }
}
module.exports= {authMiddleware}