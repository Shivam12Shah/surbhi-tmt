const express = require("express")
require("dotenv").config({path:"./.env"})
const path = require("path")
const app = express()

require("./config/db")

const indexRouter = require("./routes/index")
const exprenseRouter = require("./routes/expenseRouter")

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

app.use("/", indexRouter)
app.use("/expense", exprenseRouter)

app.listen(process.env.PORT, ()=>{
    console.log(`Server is running on PORT ${process.env.PORT}`)
})