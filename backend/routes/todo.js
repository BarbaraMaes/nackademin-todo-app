const express = require("express");
const router = express.Router();
const controller = require("../controllers/main");

//get all todo items
router.get("/", controller.getItems);

//get one todo item from given id
router.get("/:id", controller.getItem);

//post one todo item 
router.post("/", controller.postItem);

//update a todo item with given id
router.put("/:id", controller.updateItem);

//delete a todo item with given id
router.delete("/:id", controller.deleteItem);

module.exports = router;