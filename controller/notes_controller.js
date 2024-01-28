const pool = require("../database/index")

const controller = {
    getAll: async (req, res) => {
        try {
            const [rows, fields] = await pool.query("SELECT * FROM notes");
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
            const { chat_id, content } = req.body;
            const notes_create = new Date();

            console.log(req.body);

            const insertSql = "INSERT INTO notes (user_id, chat_id, content, notes_create) VALUES (?,?,?,?)";
            const [insertRows, insertFields] = await pool.query(insertSql, [id, chat_id, content, notes_create]);
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
    pinNotes: async (req, res) => {
        try {
            const { id } = req.params;
            const { chat_id } = req.body;
            console.log(id);
            console.log(req.body);
            const sql = "UPDATE notes SET pinned = ? WHERE user_id = ? AND chat_id = ?"
            const [rows, fields] = await pool.query(sql, [0, id, chat_id])
            // console.log(rows);
            res.json({
                data: "pined notes"
            })
        } catch (error) {
            return res.json(error);
        }
    },
    unPinNotes: async (req, res) => {
        try {
            const { id } = req.params;
            const { chat_id } = req.body;
            console.log(id);
            console.log(req.body);
            const sql = "UPDATE notes SET pinned = ? WHERE chat_id = ? AND user_id = ?"
            const [rows, fields] = await pool.query(sql, [1, chat_id, id])
            // console.log(rows);
            res.json({
                data: "unpined notes"
            })
        } catch (error) {
            return res.json(error);
        }
    },
}

module.exports = controller