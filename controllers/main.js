const actions = require('../models/CRUD-Todo');

//check role, ADMIN can see all posts, USER can only see their own
exports.getItems = async (req, res, next) => {
    try {
        let allItems;
        if (req.role === "ADMIN") {
            allItems = await actions.getItems()
        }
        else {
            allItems = await actions.getItems(req.userId)
        }
        if (!allItems) {
            return res.json({ message: "You have nothing to do" });
        }
        res.status(200).json({ items: allItems });
    } catch (error) {
        console.log(error);
        next(error);
    }
}

exports.getItem = async (req, res, next) => {
    //get specific item from params id
    try {
        const item = await actions.getItem(req.params.id);
        if (!item) {
            const error = new Error("Could not find item.");
            error.statusCode = 404;
            throw error;
        }
        res.status(200).json({ message: "Items fetched", item: item });
    } catch (error) {
        if (!error.statusCode) {
            error.statusCode = 500;
        }
        next(error)
    }
}

/*exports.postItem = async (req, res, next) => {
    //post a new todo item with the logged in userID
    try {
        const item = await actions.postItem(req.body.title, req.body.description, req.userId);
        res.status(201).json({ message: "Created successfully", item: item });
    } catch (error) {
        if (!error.statusCode) {
            error.statusCode = 500
        }
        next(error);
    }
}*/

exports.postItem = async (req, res, next) => {
    //post a new todo item with the logged in userID
    const listId = req.params.id;
    try {
        const doc = await actions.postItem(listId, req.body.title, req.body.description);
        res.status(201).json({ message: "Created successfully", item: doc });
    } catch (error) {
        console.log(error);
        if (!error.statusCode) {
            error.statusCode = 500
        }
        next(error);
    }
}

exports.postList = async (req, res, next) => {
    try {
        const list = await actions.postList(req.body.title, req.userId);
        res.status(201).json({ message: "Created successfully", list: list });
    } catch (error) {
        if (!error.statusCode) {
            error.statusCode = 500
        }
        next(error);
    }
}

exports.updateItem = async (req, res, next) => {
    //update a todoitem
    try {
        const updated = await actions.updateItem(req.body._id, req.body.title, req.body.description, req.body.done || false);
        if (updated.nModified === 0) {
            const error = new Error("Something went wrong");
            error.statusCode = 500;
            throw error;
        }
        res.status(200).json({ message: "Updated" });
    } catch (error) {
        if (!error.statusCode) {
            error.statusCode = 500;
        }
        next(error);
    }
}

exports.deleteItem = async (req, res) => {
    const deleted = await actions.deleteItem(req.params.id);
    console.log(deleted);
    if (deleted.nModified === 0) {
        return res.status(500).json({ message: "Something went wrong" });
    }
    res.status(200).json({ message: "Deleted succesfuly" });

}

exports.deleteList = async (req, res) => {
    if (res.status(403)) {
        return res.status(403).json({ message: "This action is not allowed" });
    }
    const deleted = await actions.deleteList(req.params.id);
    if (deleted.nModified === 1) {
        res.status(500).json({ message: "Something went wrong" });
    }
    res.status(200).json({ message: "Deleted succesfuly" });
}