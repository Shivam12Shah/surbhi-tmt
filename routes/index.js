const express = require("express")
const router = express.Router()
const expenseModel = require("../models/expenseSchmea")
const { isLoggedIn } = require("../middleware/isloggedin")

router.get("/", isLoggedIn ,async (req,res)=>{
    try {
        const allexpenses = await expenseModel.find()
        const flash = req.flash('success')
        res.render("index", {allexpenses, flash})
    } catch (error) {
        next(error)
    }
})
router.get('/flash', function(req, res){
    // Set a flash message by passing the key, followed by the value, to req.flash().
    req.flash('info', 'Flash is back!')
    res.redirect('/');
  });
   
module.exports = router