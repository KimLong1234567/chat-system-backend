const express = require("express");
const router = express.Router();

const chat_members_router = require("../controller/chat_members_controller");

router.get("/", chat_members_router.getAll);
router.post("/:id", chat_members_router.create);
router.put("/:id", chat_members_router.hiddenPin);
router.put("/unpin/:id", chat_members_router.unPin);
router.put("/turnoff/:id", chat_members_router.turnOffNoti);
router.put("/turnon/:id", chat_members_router.turnOnNoti);
router.delete("/:id", chat_members_router.deleteChat);

module.exports = router;