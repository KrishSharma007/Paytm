const express=require("express")
const jwt=require("jsonwebtoken")
const router=express.Router()
const {z}=require("zod")
const { User, Account } = require("../db")
const JWT_SECRET = require("../config")
const { authMiddleware } = require("../middleware/middleware")
const UserSchema=z.object({
    username: z.string().min(3).max(30),
    firstName: z.string().max(50),
    lastName: z.string().max(50),
    password: z.string().min(6),
})
const SigninSchema=z.object({
    username: z.string().min(3).max(30),
    password: z.string().min(6),
})
const UpdateUserSchema=z.object({
    password: z.string().optional().min(6),
    firstName: z.string().optional().max(50),
    lastName: z.string().optional().max(50),
})

const validate=(schema)=>(req,res,next)=>{
    const request=req.body
    let result=schema.safeParse(request)
    if (result.success) {
        next()
    } else {
        return res.status(400).json({
            errors: result.error.errors
        })
    }
}

router.get("/bulk",async(req,res)=>{
    const filter=req.query.filter || "";
    const users=await User.find({
        $or:[{
            firstName:{
                "$regex":filter
            }
        },{
            lastName:{
                "$regex":filter
            }
        }]
    })
    return res.status(200).json({
        user: users.map(user=>({
            username: user.username,
            firstName:user.firstName,
            lastName: user.lastName,
            _id:user._id,
        }))
    })
})
router.post("/signup",validate(UserSchema),async(req,res)=>{
    let result=req.body
    try {
        const existuser = await User.findOne({username:result.username})
        if(existuser){
            return res.status(400).json({
                errors: result.error.errors
            })
        }
    } catch (error) {
        console.log(error)
    }
    const user=await User.create({
        username: req.body.username,
        password: req.body.password,
        firstName: req.body.firstName,
        lastName: req.body.lastName,
    })
    const account= await Account.create({
        userId : user._id,
        balance: 1+Math.random()*10000
    })
    let token=jwt.sign({userId:user._id},JWT_SECRET)
    return res.status(200).json({
        message:"User created successfully",
        token: token
    })
})
router.put("/",validate(UpdateUserSchema),authMiddleware,async(req,res)=>{
    await User.updateOne(req.body,{id: req.userId})
    res.status(200).json({
        message:"updated successfully"
    })
})
router.post("/signin",validate(SigninSchema),async(req,res)=>{
    let {username,password}=req.body
    let user =await User.findOne({
        $and:[
            {username: username},
            {password: password}
        ]
    })
    if (user) {
        let token = jwt.sign({userId:user._id},JWT_SECRET)
        return res.status(200).json({
            message:"signed in successfully",
            token: token
        })
    }else{
        res.status(411).json({
            message: "Error while logging in"
        })
    }
})
router.delete()


module.exports=router