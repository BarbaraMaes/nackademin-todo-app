const { TodoDB } = require("../database/db.js");

exports.getItems = async (userId = null) => {
    let docs;
    if (userId) {
        docs = await TodoDB.find({ user: userId });
    }
    else {
        docs = await TodoDB.find();
    }
    return docs;
}

exports.getItem = async (id) => {
    const doc = await TodoDB.findOne({ _id: id });
    return doc;
}

exports.postItem = async (title, description, user) => {
    const doc = await TodoDB.insert({ title: title, description: description, done: false, user: user });
    return doc;
}

exports.updateItem = async (id, title, description, done) => {
    const updated = await TodoDB.update({ _id: id }, { $set: { title: title, description: description, done: done } });
    return updated
}

exports.deleteItem = async (id) => {
    const deleted = await TodoDB.remove({ _id: id });
    return deleted;
}