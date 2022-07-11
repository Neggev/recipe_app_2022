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
const PORT = process.env.PORT || 8000;




//middleware

const buildPath = path.join(__dirname, '..', 'build')

app.use(cors());
app.use(express.json({ limit: "10mb" }));
app.use(express.urlencoded({ extended: true }));
app.use(express.static(buildPath));
app.use(passport.initialize());


// routes
app.use("/search", searchRouter)
app.use("/user", userRouter)


if (process.env.NODE_ENV !== 'production') {
    const root = express.static(path.resolve(__dirname, '..', 'front', 'frontend', 'build'));
    app.use(root);
    app.get("*", (req, res) => {
        res.sendFile('index.html', { root })
    })
}

app.listen(PORT, () => {
    console.log("server starting..." + PORT);
});

