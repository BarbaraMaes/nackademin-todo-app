const Datastore = require("nedb-promises");

exports.TodoDB = new Datastore({ filename: __dirname + '/../database/Todo', autoload: true });
exports.AuthDB = new Datastore({ filename: __dirname + '/../database/Auth', autoload: true });

//module.exports = db;