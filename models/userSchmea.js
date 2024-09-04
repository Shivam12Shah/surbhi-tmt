const mongoose = require("mongoose")

const plm = require("passport-local-mongoose")

const userSchema = new mongoose.Schema({
    username: String,
    email:String,
    password:String,
    avatar:{
        type:String,
        default:"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTwp1QThjHtz534w9-y67iKcNPItGTdcv-8LQ&s"
    }
    
},{
    timestamps: true,
})

userSchema.plugin(plm)

module.exports = mongoose.model("user", userSchema)