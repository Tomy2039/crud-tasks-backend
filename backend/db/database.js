const mysql = require('mysql2/promise');

const connectDB = ()=> {
    return mysql.createConnection({
        host:'localhost',
        user:'root',
        password:'',
        database:'tasks_db'
    });
}

module.exports = connectDB;
