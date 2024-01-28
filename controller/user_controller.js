const pool = require("../database/index")
const crypto = require('crypto');

const hashPassword = (password) => {
    const sha256 = crypto.createHash('sha256');
    sha256.update(password);
    return sha256.digest('hex');
};

const controller = {
    getAll: async (req, res) => {
        try {
            const [rows, fields] = await pool.query("SELECT * FROM users");
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
            const { user_name, user_email, user_password } = req.body;
            const user_create = new Date();
            const hashedpassword = hashPassword(user_password);

            console.log(req.body);
            console.log(hashedpassword);
            const sql = "INSERT INTO users (user_name, user_password, user_email, user_create) VALUES (?,?,?,?)"

            const [rows, fields] = await pool.query(sql, [user_name, hashedpassword, user_email, user_create])
            // console.log(rows);
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
    login: async (req, res) => {
        try {
            const { user_email, user_password } = req.body;
            if (user_password !== "") {
                const hashedpassword = hashPassword(user_password);
                console.log(hashedpassword);
                console.log(req.body);
                const [rows] = await pool.query("SELECT * FROM users WHERE user_email = ?", user_email);

                if (!rows.length) {
                    return res.json({ data: "Không tìm thấy users" });
                }

                const user = rows[0];

                if (user.user_email !== user_email) {
                    return res.status(401).json({ error: "Wrong email or password" });
                } else if (user.user_password !== hashedpassword) {
                    return res.status(401).json({ error: "Wrong email or password" });
                } else {
                    console.log("da login");
                    return res.status(200).json({ data: "signed", user });
                }
            }
        } catch (error) {
            return res.json(error);
        }
    },
    chat_enable: async (req, res) => {
        try {
            const { id } = req.params;
            console.log(id);
            const [rows, fields] = await pool.query("UPDATE users SET chat_enabled = 1 WHERE user_name = ?", [id]);
            res.json({
                data: rows
            })
        } catch (error) {
            return res.json(error);
        }
    }
}

module.exports = controller