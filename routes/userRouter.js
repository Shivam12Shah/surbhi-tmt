const express = require("express");
const router = express.Router();
const userModel = require("../models/userSchmea");

const localStrategy = require("passport-local");

const passport = require("passport");
const { isLoggedIn } = require("../middleware/isloggedin");
const upload = require("../utils/multer");
passport.use(new localStrategy(userModel.authenticate()));

router.get("/register", async (req, res) => {
  res.render("register");
});
router.get("/login", async (req, res) => {
  res.render("login");
});

router.post("/register", async function (req, res, next) {
  try {
    const { username, email, password } = req.body;
    await userModel.register({ username, email }, password);
    // await UserSchema.authenticate(username, password);
    // res.redirect("/user/profile");
    res.redirect("/");
  } catch (error) {
    next(error);
  }
});

router.post("/login",
  passport.authenticate("local", {
    successRedirect: "/",
    failureRedirect: "/user/login",
  }),
  (req, res) => {}
);

router.get('/logout', function(req, res, next) {
    req.logout(function(err) {
      if (err) { return next(err); }
      res.redirect('/user/login');
    });
  });

  router.get("/updateuser",isLoggedIn,(req, res, next)=>{
    res.render("updateuser", {user:req.user})
  })

router.post("/updateuser/:id", isLoggedIn, async(req, res, next)=>{
  try {
    const updatedUser = await userModel.findByIdAndUpdate(req.params.id, req.body, {new: true})
    await updatedUser.save();
    req.flash('success', 'User Updated Successfully')
    res.redirect('/')
  } catch (error) {
    next(error)
  }
})

router.get("/resetpassword", isLoggedIn, (req, res, next)=>{
  res.render("resetpassword")
})

router.post("/resetpassword",isLoggedIn, async(req, res, next)=>{
  try {
    await req.user.changePassword(req.body.oldpassword, req.body.newpassword)
    await req.user.save()
    res.redirect("/")
  } catch (error) {
    next(error)
  }
})

router.post('/profile',isLoggedIn, upload.single('avatar'), async function (req, res, next) {
  try {
    const user = req.user
    user.avatar = req.file.filename
    await user.save()
    res.redirect("/")
  } catch (error) {
    next(error)
  }
})

module.exports = router;
