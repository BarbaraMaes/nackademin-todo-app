const Datastore = require("nedb-promises");
require('dotenv').config()

if (process.env.ENV === "dev") {
    exports.TodoDB = new Datastore({ filename: __dirname + '/../database/Todo.db', autoload: true, corruptAlertThreshold: 1 });
    exports.AuthDB = new Datastore({ filename: __dirname + '/../database/Auth.db', autoload: true, corruptAlertThreshold: 1 });
}
else if (process.env.ENV === "test") {
    exports.TodoDB = new Datastore({ filename: __dirname + '/../database/test.Todo.db', autoload: true });
    exports.AuthDB = new Datastore({ filename: __dirname + '/../database/test.Auth.db', autoload: true });
    this.TodoDB.remove({}, { multi: true });
    this.AuthDB.remove({}, { multi: true });
}
else {
    console.log("something went wrong with the databse");
}