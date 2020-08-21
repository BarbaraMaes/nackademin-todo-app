const express = require("express");
const router = express.Router();
const mainController = require("../controllers/main");

//get all todo items
router.get("/", mainController.getItems);

//get one todo item from given id
router.get("/:id", mainController.getItem);

//post one todo item 
router.post("/", mainController.postItem);

//update a todo item with given id
router.put("/:id", mainController.updateItem);

//delete a todo item with given id
router.delete("/:id", mainController.deleteItem);

module.exports = router;