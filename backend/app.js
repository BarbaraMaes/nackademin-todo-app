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

app.use(todoRoutes);
app.use('/user', userRoutes);

app.listen(3000, () => {
    console.log("server started on port 3000")
})