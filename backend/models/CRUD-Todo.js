//const { uuid } = require("uuidv4");
const { v4: uuidv4 } = require("uuid");

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

exports.postItem = async (listId, title, description, done = false) => {
    try {
        const id = uuidv4();
        const doc = await TodoDB.update({ _id: listId }, { $push: { items: { title: title, description: description, done: done, _id: id } } });
        return doc;
    } catch (error) {
        console.log(error)
    }
}

exports.postList = async (title, userId) => {
    const list = await TodoDB.insert({ title: title, userId: userId, items: [] });
    return list;
}


exports.updateItem = async (id, title, description, done) => {
    //get list of the item
    const list = await TodoDB.findOne({ "items._id": id });
    //remove old item from the list
    await TodoDB.update({ "items._id": id }, { $pull: { items: { _id: id } } });
    //add new item to the same list
    const addNew = await this.postItem(list._id, title, description, done);
    return addNew
}

exports.deleteItem = async (id) => {
    //delete a todo item, Only ADMIN can delete items
    let deleted;
    try {
        //get list of the item
        const list = await TodoDB.findOne({ "items._id": id });
        //remove old item from the list
        deleted = await TodoDB.update({ "items._id": id }, { $pull: { items: { _id: id } } });

    } catch (error) {
        next(error);
    }
    return deleted;
}
