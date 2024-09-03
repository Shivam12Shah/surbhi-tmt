const express = require("express");
require("dotenv").config({ path: "./.env" });
const path = require("path");
const app = express();
const expresssession = require("express-session");
const passport = require("passport");
const userModel = require("./models/userSchmea")

require("./config/db");

const indexRouter = require("./routes/index");
const exprenseRouter = require("./routes/expenseRouter");
const userRouter = require("./routes/userRouter")

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
// app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

app.use(expresssession({
    resave: false,
    saveUninitialized: true,
    secret: process.env.SECRET,
  })
);
app.use(passport.initialize());
app.use(passport.session());
passport.serializeUser(userModel.serializeUser());
passport.deserializeUser(userModel.deserializeUser());


app.use("/", indexRouter);
app.use("/expense", exprenseRouter);
app.use("/user",userRouter )

app.use("*", (req, res) => {
  res.status(404).json({ message: "Route Not Found" });
});

app.use((err, req, res, next) => {
  res.status(500).json({
    message: err.message,
    defalulterror: "internl server not found",
  });
});

app.listen(process.env.PORT, () => {
  console.log(`Server is running on PORT ${process.env.PORT}`);
});
