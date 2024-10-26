const express=require("express")
const router=express.Router()
const userRouter=require("./user.js")

router.use("/user",userRouter)

router.get()
router.post()
router.put()
router.delete()


module.exports= router