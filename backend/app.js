const express = require("express");
const app = express();
//const bodyParser = require("body-parser");
const cors = require("cors");
const todoRoutes = require("./routes/todo");
const userRoutes = require("./routes/user");

require("dotenv").config()

app.use(cors());
app.use(express.json())
//app.use(bodyParser.json());
//app.use(bodyParser.urlencoded({ extended: true }));

app.use('/todo', todoRoutes);
app.use('/user', userRoutes);

app.use((error, req, res, next) => {
    console.log(error);
    const status = error.statusCode || 500;
    const message = error.message;
    const data = error.data;
    res.status(status).json({
        message: message,
        data: data
    });
});

module.exports = app;

/*
All newly created users have the role user.
users :
{ role: "USER", username: "user", password: "123"}
{ role: "ADMIN", username: "admin", password: "123"}
*/