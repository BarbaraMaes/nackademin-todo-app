const app = require("./app");
const Database = require("./database/database");
require('dotenv').config()

Database.connect().then(() => {
    app.listen(process.env.PORT || 8080, () => console.log("it's running"))
}).catch(err => console.log(err));

/*app.listen(process.env.PORT || 8080, () => {
    console.log(`server started on port ${process.env.PORT}`);
})*/