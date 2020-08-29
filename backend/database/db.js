const Datastore = require("nedb-promises");

exports.TodoDB = new Datastore({ filename: __dirname + '/../database/Todo.db', autoload: true });
exports.AuthDB = new Datastore({ filename: __dirname + '/../database/Auth.db', autoload: true });

//module.exports = db;