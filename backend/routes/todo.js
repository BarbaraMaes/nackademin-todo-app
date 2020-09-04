const express = require("express");
const router = express.Router();
const controller = require("../controllers/main");
const auth = require("../middleware/is-auth");

//get all todo items
router.get("/", auth.isAuth, controller.getItems);

//get one todo item from given id
router.get("/:id", auth.isAuth, controller.getItem);

//post one todo item 
//router.post("/", auth.isAuth, controller.postItem);
//post a new list 
router.post("/", auth.isAuth, controller.postList);

//post item to a list
router.post("/:id", auth.isAuth, controller.postItem);

//delete a todo item with given id 
//only admin can delete items
// auth.checkRole("ADMIN"),
router.delete("/item/:id", auth.isAuth, controller.deleteItem);

//update a todo item with given id
router.put("/item", auth.isAuth, controller.updateItem);

//update a todo item with given id
//router.put("/list/:id", auth.isAuth, controller.updateList);

//delete a list with given id 
//only admin can delete items
//router.delete("/list/:id", auth.isAuth, auth.checkRole("ADMIN"), controller.deleteList);

module.exports = router;