const mongoose = require('mongoose');
const { MongoMemoryServer } = require('mongodb-memory-server');
require('dotenv').config()

let mongoDatabase

switch (process.env.ENV) {
    case 'dev':
        mongoDatabase = {
            // mongodb+srv://user:password@host/dbname
            getUri: async () =>
                `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@todo.hxnc3.mongodb.net/Todo?retryWrites=true&w=majority`
        }
        break;
    case 'test':
        mongoDatabase = new MongoMemoryServer()
        break;
    case 'production':
    case 'staging':
        mongoDatabase = {
            // mongodb+srv://user:password@host/dbname
            getUri: async () =>
                `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@${process.env.DB_HOST}/${process.env.DB_NAME}?retryWrites=true&w=majority`
        }
        break;
}

async function connect() {

    let uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@todo.hxnc3.mongodb.net/Todo?retryWrites=true&w=majority`
    //await mongoDatabase.getUri();

    await mongoose.connect(uri, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useFindAndModify: false,
        useCreateIndex: true
    })
}

async function disconnect() {
    if (process.env.ENV == 'test' || process.env.ENV == 'development') {
        await mongoDatabase.stop()
    }
    await mongoose.disconnect()
}


module.exports = {
    connect, disconnect
}