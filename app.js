const express = require("express")
require("dotenv").config({path:"./.env"})
const path = require("path")
const app = express()

require("./config/db")



const indexRouter = require("./routes/index")
const exprenseRouter = require("./routes/expenseRouter")

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
// app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

app.use("/", indexRouter)
app.use("/expense", exprenseRouter)

app.use("*",(req, res)=>{
    res.status(404).json({message:"Route Not Found"})
})

app.use((err, req, res ,next)=>{
    res.status(500).json({
        message:err.message,
        defalulterror:"internl server not found"
    })
})

app.listen(process.env.PORT, ()=>{
    console.log(`Server is running on PORT ${process.env.PORT}`)
})