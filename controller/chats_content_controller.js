const pool = require("../database/index")

const controller = {
    getAll: async (req, res) => {
        try {
            const [rows, fields] = await pool.query("SELECT * FROM chats_content");
            res.json({
                data: rows
            })
        } catch (error) {
            console.log(error);
            res.json({
                status: "error"
            })
        }
    },
    create: async (req, res) => {
        try {
            const { id } = req.params;
            const { chat_id, chat_content } = req.body;
            const chat_send_datetime = new Date();

            console.log(req.body);

            const insertSql = "INSERT INTO chats_content (user_id, chat_id, chat_content, chat_send_datetime) VALUES (?,?,?,?)";
            const [insertRows, insertFields] = await pool.query(insertSql, [id, chat_id, chat_content, chat_send_datetime]);
            res.json({
                data: insertRows
            });
        } catch (error) {
            console.log(error);
            res.json({
                status: "error"
            });
        }
    },
    pinChat: async (req, res) => {
        try {
            const { id } = req.params;
            const { chat_id } = req.body;
            console.log(id);
            console.log(req.body);
            const sql = "UPDATE chats_content SET chat_pin = ? WHERE user_id = ? AND chat_id = ?"
            const [rows, fields] = await pool.query(sql, [1, id, chat_id])
            // console.log(rows);
            res.json({
                data: "pined message"
            })
        } catch (error) {
            return res.json(error);
        }
    },
    unPinChat: async (req, res) => {
        try {
            const { id } = req.params;
            const { chat_id } = req.body;
            console.log(id);
            console.log(req.body);
            const sql = "UPDATE chats_content SET chat_pin = ? WHERE chat_id = ? AND user_id = ?"
            const [rows, fields] = await pool.query(sql, [0, chat_id, id])
            // console.log(rows);
            res.json({
                data: "unpined message"
            })
        } catch (error) {
            return res.json(error);
        }
    },
    deleteChatSend: async (req, res) => {
        try {
            const { id } = req.params;
            const { chat_id } = req.body
            console.log(id);
            const [rows, fields] = await pool.query("UPDATE chats_content SET chat_content_status = 1 WHERE chat_id = ? AND user_id = ?", [chat_id, id]);
            res.json({
                data: rows
            })
        } catch (error) {
            return res.json(error);
        }
    }
}

module.exports = controller