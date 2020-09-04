const { TodoDB } = require("../database/db.js");

exports.clear = async () => {
    const clear = await TodoDB.remove({}, { multi: true });
    return clear;
}

exports.getItems = async (userId = null) => {
    let docs;
    if (userId) {
        docs = await TodoDB.find({ userId: userId });
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

exports.getOwner = async (id) => {
    const doc = await TodoDB.findOne({ _id: id });
    return doc;
}
/*exports.postItem = async (title, description, user) => {
    const doc = await TodoDB.insert({ title: title, description: description, done: false, user: user });
    return doc;
}*/

exports.postItem = async (listId, title, description) => {
    const doc = await TodoDB.update({ _id: listId }, { $push: { items: { title: title, description: description, done: false, _id: listId + title.replace(/ /g, '') } } });
    return doc;
}

exports.postList = async (title, userId) => {
    const list = await TodoDB.insert({ title: title, userId: userId, items: [] });
    return list;
}

/*exports.getList = async (id) => {
    const list = await TodoDB.findOne({ _id: id });
    console.log(list);
    return list;
}*/

exports.updateItem = async (id, title, description, done) => {
    const updated = await TodoDB.update({ _id: id }, { $set: { title: title, description: description, done: done } });
    return updated
}

exports.deleteItem = async (id) => {
    //delete a todo item, Only ADMIN can delete items
    try {
        const deleted = await TodoDB.remove({ _id: id });
    } catch (error) {
        next(error);
    }
    return deleted;
}
