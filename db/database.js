import mysql from 'mysql2/promise';

const conexion = async () => {
    return await mysql.createConnection({
        host: 'localhost',
        user: 'root',
        password: '',
        database: 'tasks_db'
    });
};

export { conexion }
