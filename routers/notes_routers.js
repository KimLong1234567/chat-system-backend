const express = require("express");
const router = express.Router();

const notesController = require("../controller/notes_controller");

router.get("/", notesController.getAll);
router.post("/:id", notesController.create);
router.post("/pin/:id", notesController.pinNotes);
router.post("/unpin/:id", notesController.unPinNotes);

module.exports = router;