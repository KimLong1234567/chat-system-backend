const mysql = require('mysql2');

const pool = mysql.createPool({
    user: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    server: process.env.DB_HOST,
    database: process.env.DB_DATABASE,
    // options: {
    //     encrypt: true, // Nếu sử dụng SQL Server qua mạng, hãy bật tùy chọn mã hóa
    // },
});

// const pool = new sql.ConnectionPool(config);
// const poolConnect = pool.connect();

// module.exports = {
//     pool,
//     poolConnect,
// };

module.exports = pool.promise()