const express = require("express")
const cors = require("cors");

const app = express()
app.use(cors());

require('dotenv').config()

const user_router = require("./routers/user_routers")
const chat_router = require("./routers/chats_routers")
const chat_members_router = require("./routers/chat_members_routers")
const chat_content_routers = require("./routers/chat_content_routers")
const notes_routers = require("./routers/notes_routers");

app.use(express.urlencoded({ extended: false }))
app.use(express.json())

app.use("/api/users", user_router)
app.use("/api/chats", chat_router)
app.use("/api/chatmembers", chat_members_router)
app.use("/api/chatcontent/", chat_content_routers)
app.use("/api/notes", notes_routers)

const PORT = process.env.PORT || 5000

app.listen(PORT, () => {
    console.log(`Server running on PORT: ${PORT}.`);
})