const express=require("express")
const app=express()
const cors =require("cors")
const routes=require('./routes/index.js')
const { universalErrorHandler } = require("./middleware/universalError.js")
const port = process.env.PORT||3000
app.use(cors())
app.use(express.json())
app.use("/api/v1",routes);
app.use(universalErrorHandler);
app.listen(port,'0.0.0.0',()=>{console.log(`listing to ${port} `);})