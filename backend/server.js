// dependencies imports

require("dotenv").config();
const express = require('express');
const cors = require('cors');
const cloudinary = require('./config/cloudinary.config');
const path = require('path');
const passport = require("passport");


// components imports


const searchRouter = require('./routes/recipeSearch.route')
const userRouter = require('./routes/user.route')

// app settings imports


const app = express();
const PORT = 8000;


//middleware

app.use(cors({
    origin: '*'
}));
app.use(express.json({ limit: "10mb" }));
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));




app.use(passport.initialize());



app.use("/search", searchRouter)
app.use("/user", userRouter)

app.listen(PORT, () => {
    console.log("server starting..." + PORT);
});

