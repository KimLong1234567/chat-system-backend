const pool = require("../database/index")

const controller = {
    getAll: async (req, res) => {
        try {
            const [rows, fields] = await pool.query("SELECT * FROM chats");
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
            const { chat_name } = req.body;
            const chat_create = new Date();

            console.log(req.body);

            const insertSql = "INSERT INTO chats (user_id, chat_name, chat_create) VALUES (?,?,?)";
            const [insertRows, insertFields] = await pool.query(insertSql, [id, chat_name, chat_create]);

            const selectSql = "SELECT * FROM chats WHERE user_id = ? ORDER BY chat_create DESC LIMIT 1";
            const [selectRow, selectFields] = await pool.query(selectSql, [id]);

            if (selectRow.length > 0) {
                const { chat_id } = selectRow[0];
                const insertChatMembersSql = "INSERT INTO chat_members (user_id, chat_id, role_type, chat_members_create) VALUES (?,?,?,?)";
                const [insertChatMembersRows, insertChatMembersFields] = await pool.query(insertChatMembersSql, [id, chat_id, 1, chat_create]);
                res.json({
                    data: { chat_id }
                });
            } else {
                res.json({
                    data: null
                });
            }
        } catch (error) {
            console.log(error);
            res.json({
                status: "error"
            });
        }
    },
    deleteChat: async (req, res) => {
        try {
            const { id } = req.params;
            console.log(id);
            const [rows, fields] = await pool.query("UPDATE chats SET chat_status = 1 WHERE chat_id = ?", [id]);
            res.json({
                data: rows
            })
        } catch (error) {
            return res.json(error);
        }
    }
}

module.exports = controller