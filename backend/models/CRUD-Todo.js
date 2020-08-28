const { TodoDB } = require("../database/db.js");

exports.getItems = async () => {
    const docs = await TodoDB.find();
    return docs;
}

exports.getItem = async (id) => {
    const doc = await TodoDB.findOne({ _id: id });
    return doc;
}

exports.postItem = async (title, description) => {
    const doc = await TodoDB.insert({ title: title, description: description, done: false });
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