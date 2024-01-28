const express = require("express");
const router = express.Router();

const chat_content_routers = require("../controller/chats_content_controller");

router.get("/", chat_content_routers.getAll);
router.post("/:id", chat_content_routers.create);
router.put("/:id", chat_content_routers.pinChat);
router.put("/unpin/:id", chat_content_routers.unPinChat);
router.delete("/:id", chat_content_routers.deleteChatSend);

module.exports = router;