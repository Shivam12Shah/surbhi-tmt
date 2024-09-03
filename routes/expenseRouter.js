const express = require("express")
const router = express.Router()
const expenseModel = require("../models/expenseSchmea")
const { isLoggedIn } = require("../middleware/isloggedin")

router.get("/", (req,res)=>{
    res.send("exprees roouter")
})

router.get("/create",isLoggedIn, (req, res)=>{
    res.render("create", {message:req.flash('create')})
})

router.post("/create", async (req, res)=>{
    try {
        const newExpense = await new expenseModel(req.body)
        await newExpense.save()
        req.flash("create", "exprense is created ")
        res.redirect("/expense/create")
    } catch (error) {
        
    }
})

router.get("/delete/:id",isLoggedIn ,async (req, res)=>{
    try {
        await expenseModel.findByIdAndDelete(req.params.id) 
        // await expenseModel.save()
        res.redirect("/")
    } catch (error) {
        
    }
})

router.get("/details/:id", async(req, res)=>{
    try {
        const dets = await expenseModel.findById(req.params.id)
        res.render("showexpresnsedetails", {dets})
    } catch (error) {
        
    }
})
router.get("/update/:id",async (req, res)=>{
    try {
        const updatedets = await expenseModel.findById(req.params.id)
        res.render("updateexpense", {updatedets})
    } catch (error) {
        
    }
})

router.post("/update/:id", async(req, res)=>{
    try {
        await expenseModel.findByIdAndUpdate(req.params.id, req.body)
        res.redirect("/")
    } catch (error) {
        
    }
})

module.exports = router