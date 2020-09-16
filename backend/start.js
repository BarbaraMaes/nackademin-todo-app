const app = require("./app");

app.listen(3000, () => {
    console.log("server started on port 3000")
})

/*    "build": "cd backend nodemon start.js && cd frontend react-scripts start",
    "start": "cd backend nodemon start.js"*/