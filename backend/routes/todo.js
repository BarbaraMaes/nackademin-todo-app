const express = require("express");
const router = express.Router();
const controller = require("../controllers/main");
const auth = require("../middleware/is-auth");

//get all todo items
router.get("/", auth.isAuth, controller.getItems);

//get one todo item from given id
router.get("/:id", auth.isAuth, controller.getItem);

//post one todo item 
router.post("/", auth.isAuth, controller.postItem);

//update a todo item with given id
router.put("/:id", auth.isAuth, controller.updateItem);

//delete a todo item with given id 
//only admin can delete items
router.delete("/:id", auth.isAuth, auth.checkRole("ADMIN"), controller.deleteItem);

module.exports = router;