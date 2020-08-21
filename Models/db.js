const Datastore = require("nedb-promises");

db = new Datastore({ filename: __dirname + '/../Database/data', autoload: true });

module.exports = db;