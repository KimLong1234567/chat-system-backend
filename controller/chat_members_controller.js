const pool = require("../database/index")

const controller = {
    getAll: async (req, res) => {
        try {
            const [rows, fields] = await pool.query("SELECT * FROM chat_members");
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
            const { chat_id } = req.body;
            const chat_members_create = new Date();

            console.log(req.body);

            const insertSql = "INSERT INTO chat_members (user_id, chat_id, role_type, chat_members_create ) VALUES (?,?,?,?)";
            const [insertRows, insertFields] = await pool.query(insertSql, [id, chat_id, 3, chat_members_create]);
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
    hiddenPin: async (req, res) => {
        try {
            const { id } = req.params;
            const { chat_id, pin_code } = req.body;
            console.log(id);
            console.log(req.body);
            const sql = "UPDATE chat_members SET pin_code = ? WHERE user_id = ? AND chat_id = ?"
            const [rows, fields] = await pool.query(sql, [pin_code, id, chat_id])
            // console.log(rows);
            res.json({
                data: "pined"
            })
        } catch (error) {
            return res.json(error);
        }
    },
    unPin: async (req, res) => {
        try {
            const { id } = req.params;
            const { chat_id } = req.body;
            console.log(id);
            console.log(req.body);
            const sql = "UPDATE chat_members SET pin_code = ? WHERE chat_id = ? AND user_id = ?"
            const [rows, fields] = await pool.query(sql, [0, chat_id, id])
            // console.log(rows);
            res.json({
                data: "unpined"
            })
        } catch (error) {
            return res.json(error);
        }
    },
    turnOffNoti: async (req, res) => {
        try {
            const { id } = req.params;
            const { chat_id } = req.body;
            const sql = "UPDATE chat_members SET chat_members_notification = 1 WHERE chat_id = ? AND user_id = ?"
            const [rows, fields] = await pool.query(sql, [chat_id, id])
            res.json({
                data: "disabled notification"
            })
        } catch (error) {
            return res.json(error);
        }
    },
    turnOnNoti: async (req, res) => {
        try {
            const { id } = req.params;
            const { chat_id } = req.body;
            const sql = "UPDATE chat_members SET chat_members_notification = 0 WHERE chat_id = ? AND user_id = ?"
            const [rows, fields] = await pool.query(sql, [chat_id, id])
            res.json({
                data: "enabled notification"
            })
        } catch (error) {
            return res.json(error);
        }
    },
    deleteChat: async (req, res) => {
        try {
            const { id } = req.params;
            console.log(id);
            const [rows, fields] = await pool.query("UPDATE chats_members SET chat_status = 1 WHERE chat_id = ?", [id]);
            res.json({
                data: rows
            })
        } catch (error) {
            return res.json(error);
        }
    }
}

module.exports = controller