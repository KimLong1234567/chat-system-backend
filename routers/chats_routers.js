const express = require("express");
const router = express.Router();

const chatsController = require("../controller/chats_controller");

router.get("/", chatsController.getAll);
router.post("/:id", chatsController.create);
router.delete("/:id", chatsController.deleteChat);

module.exports = router;