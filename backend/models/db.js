const Datastore = require("nedb-promises");

db = new Datastore({ filename: __dirname + '/../database/data', autoload: true });

module.exports = db;