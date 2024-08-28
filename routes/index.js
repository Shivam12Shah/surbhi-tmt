const express = require("express")
const router = express.Router()
const expenseModel = require("../models/expenseSchmea")

router.get("/", async (req,res)=>{
    try {
        const allexpenses = await expenseModel.find()
        res.render("index", {allexpenses})
    } catch (error) {
        next(error)
    }
})

module.exports = router