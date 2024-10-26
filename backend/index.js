const express=require("express")
const app=express()
const cors =require("cors")
const routes=require('./routes/index.js')
app.use(cors())
app.use(express.json())
app.use("/api/v1",routes);
app.listen(3000,()=>{console.log("listing to port 3000");})