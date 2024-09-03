const express = require("express");
const router = express.Router();
const userModel = require("../models/userSchmea");

const localStrategy = require("passport-local");

const passport = require("passport");
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

module.exports = router;
