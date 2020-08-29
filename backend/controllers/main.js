const actions = require('../models/CRUD-Todo');

exports.getItems = async (req, res) => {
    try {
        let allItems;
        if (req.role === "ADMIN") {
            allItems = await actions.getItems()
        }
        else {
            allItems = await actions.getItems(req.userId)
        }
        if (!allItems) {
            res.send("Nothing to do");
        }
        res.send(allItems);
    } catch (error) {
        console.log(error);
    }
}

exports.getItem = async (req, res) => {
    //get specific item from params id
    try {
        const item = await actions.getItem(req.params.id);
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
        const item = await actions.postItem(req.body.title, req.body.description, req.userId);
        res.json(item);
    } catch (error) {
        console.log(error);
    }
}

exports.updateItem = async (req, res) => {
    //update a new todo item
    try {
        const updated = await actions.updateItem(req.body._id, req.body.title, req.body.description, req.body.done);
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
    if (res.status(403)) {
        return res.json({ message: "This action is not allowed" });
    }
    try {
        const deleted = await actions.deleteItem(req.params.id)
        if (deleted === 1) {
            res.status(200).json({ message: "Deleted succesfuly" });
        }
        else res.json("something went wrong");
    } catch (error) {
        console.log(error);
    }

}