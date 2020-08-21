const db = require("../models/db.js");

exports.getItems = async (req, res) => {
    try {
        const allItems = await db.find();
        //res.json(allItems);
        res.send(allItems);
    } catch (error) {
        console.log(error);
    }
}

exports.getItem = async (req, res) => {
    //get specific item from params id
    try {
        const item = await db.findOne({ _id: req.params.id });
        if (item !== null) {
            res.json(item);
        }
        else res.json("Could not find item");
    } catch (error) {
        console.log(error);
    }
}

exports.postItem = async (req, res) => {
    //post a new todo item
    try {
        const item = await db.insert({ title: req.body.title, description: req.body.description, done: false });
        res.json(item);
    } catch (error) {
        console.log(error);
    }
}

exports.updateItem = async (req, res) => {
    //update a new todo item
    console.log(req.body);
    try {
        const updated = await db.update({ _id: req.body._id }, { $set: { title: req.body.title, description: req.body.description } });
        if (updated === 1) {
            res.json("Updated succesfuly");
        }
        else res.json("something went wrong");
    } catch (error) {
        console.log(error);
    }
}

exports.deleteItem = async (req, res) => {
    //delete a todo item 
    try {
        const deleted = await db.remove({ _id: req.params.id });
        if (deleted === 1) {
            res.status(200).json({ message: "Deleted succesfuly" });
        }
        else res.json("something went wrong");
    } catch (error) {
        console.log(error);
    }

}