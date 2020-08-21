const express = require("express");
const app = express();
const bodyparser = require("body-parser");

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.listen(3000, () => {
    console.log("server started on port 3000")
})