import mysql from 'mysql2/promise';

export const conexion = () => {
 
    try {
        return mysql.createConnection({
            host: "localhost",
            user: "root",
            password: '',
            database: "tasks_db"
        })

        console.log("conectado la base de datos")

        return conexion
    } catch (error) {
        console.error("Error a al conectar la base de datos ")
        process.exit(1);
    }

}
