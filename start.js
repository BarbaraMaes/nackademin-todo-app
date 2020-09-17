const app = require("./app");
const Database = require("./database/database");
require('dotenv').config()

Database.connect().then(console.log("connected to db")).catch(err => console.log(err));

app.listen(process.env.PORT || 8080, () => {
    console.log(`server started on port ${process.env.PORT}`);
})

/*    "build": "cd backend nodemon start.js && cd frontend react-scripts start",
    "start": "cd backend nodemon start.js"*/