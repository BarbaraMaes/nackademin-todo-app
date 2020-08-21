const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const routes = require("./routes/routes");

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(routes);

app.listen(3000, () => {
    console.log("server started on port 3000")
})