import { createConnection } from 'mysql2/promise';

const conexion = () => {
    return createConnection({
        host: 'localhost',
        user: 'root',
        password: '',
        database: 'tasks_db'
    });
};

export { conexion }
