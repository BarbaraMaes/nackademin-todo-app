const db = require("../database/db.js");

exports.getItems = async () => {
    console.log("hey")
    const docs = await db.find();
    return docs;
}

exports.getItem = async (id) => {
    const doc = await db.findOne({ _id: id });
    return doc;
}

exports.postItem = async (title, description) => {
    console.log(title)
    const doc = await db.insert({ title: title, description: description, done: false });
    return doc;
}

exports.updateItem = async (id, title, description) => {
    const updated = await db.update({ _id: id }, { $set: { title: title, description: description } });
    return updated
}

exports.deleteItem = async (id) => {
    const deleted = await db.remove({ _id: id });
    return deleted;
}