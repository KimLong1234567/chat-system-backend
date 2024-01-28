const express = require("express");
const router = express.Router();

const usersController = require("../controller/user_controller");

router.get("/", usersController.getAll);
router.post("/", usersController.create);
router.post("/login", usersController.login);
router.post("/conversation/:id", usersController.chat_enable);

module.exports = router;