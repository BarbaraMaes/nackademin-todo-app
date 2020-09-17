//const { uuid } = require("uuidv4");
const { v4: uuidv4 } = require("uuid");

//const { TodoDB } = require("../database/db.js");
const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const postSchema = new Schema({
    title: String,
    userId: { type: Schema.Types.ObjectId, ref: "User" },
    items: Array
})

const Post = mongoose.model("POST", postSchema);


exports.clearUser = async (userId) => {
    await Post.deleteMany({ userId: userId });
}


exports.clear = async () => {
    return await Post.deleteMany({});
    const clear = await TodoDB.remove({}, { multi: true });
    return clear;
}

exports.getItems = async (userId = null) => {
    let docs;
    if (userId) {
        docs = await Post.find({ userId: userId });
    }
    else {
        docs = await Post.find();
    }
    return docs;
}

exports.getItem = async (id) => {
    const doc = await Post.findOne({ _id: id });
    return doc;
}

exports.getOwner = async (id) => {
    const doc = await Post.findOne({ _id: id });
    return doc;
}

exports.postItem = async (listId, title, description, done = false) => {
    try {
        const id = uuidv4();
        const doc = await Post.updateOne({ _id: listId }, { $push: { items: { title: title, description: description, done: done, _id: id } } });
        return doc;
    } catch (error) {
        console.log(error)
    }
}

exports.postList = async (title, userId) => {
    const list = await Post.create({ title: title, userId: userId, items: [] });
    return list;
}


exports.updateItem = async (id, title, description, done) => {
    try {
        console.log(id);
        const object = {
            _id: id,
            title: title,
            description: description,
            done: done
        }
        const item = await Post.updateOne({ "items._id": object._id }, { $set: { "items.$": object } });
        return item
    } catch (error) {
        console.log(error);
    }
}

exports.deleteItem = async (id) => {
    //delete a todo item, Only ADMIN can delete items
    try {
        const item = await Post.updateOne({ "items._id": id }, { $pull: { "items": { _id: id } } })
        return item;
    } catch (error) {
        console.log(error);
    }

}

exports.deleteList = async (id) => {
    try {
        const deleted = await Post.deleteOne({ _id: id });
        return deleted
    } catch (error) {
        console.log(error);
    }
}



