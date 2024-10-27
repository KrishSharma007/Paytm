const express=require("express")
const { authMiddleware } = require("../middleware/middleware")
const { Account } = require("../db")
const { default: mongoose } = require("mongoose")
const router=express.Router()

router.get("/balance",authMiddleware,async(req,res)=>{
    const account= await Account.findOne({userId:req.userId})
    res.status(200).json({
        balance: account.balance
    })
})
router.post("/transfer",authMiddleware,async(req,res)=>{
   try{ const session=await mongoose.startSession()
    let {to,amount}=req.body
    amount = parseFloat(amount)
    if (isNaN(amount) || amount <= 0) {

        await session.abortTransaction();
        return res.status(400).json({ message: "Invalid transfer amount" });
    }

    const fromAccount= await Account.findOne({userId:req.userId})
    if (!fromAccount||fromAccount.balance<amount) {
        await session.abortTransaction();
        return res.status(400).json({
            message:"Insufficient balance"
        })
    }
    const toAccount= await Account.findOne({userId:to})
    if (!toAccount) {
        await session.abortTransaction();
        return res.status(400).json({
            message:"Invalid account"
        })
    }
    await Account.updateOne({userId:req.userId},{$inc:{balance: -amount}}).session(session)
    await Account.updateOne({userId:to},{$inc:{balance: amount}}).session(session)

    await session.commitTransaction()
    res.status(200).json({
        message:"Transfer successful"
    })
}catch(error){
        await session.abortTransaction();
        console.error(error);
        res.json({
            message:"something went wrong"
        })
    }finally {
        session.endSession();
    }
})