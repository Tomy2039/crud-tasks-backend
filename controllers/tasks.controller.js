import { conexion } from '../db/database.js'

export const getAllTasks = async (req, res) => {
    let connection;
    try {
        connection = await conexion();
        const [ resultado ] = await connection.query('SELECT * FROM tasks');
        res.status(200).json(resultado);
    } catch (error) {
        console.error('Error al obtener las tareas:', error);
        return res.status(500).send('Error al obtener las tareas');
    } finally {
        await connection.end()
    };
}

export const getOnetask = async (req, res) =>{
    let connection 
    try {
        connection = await conexion();
        const { id } = req.params;
        const [ resultado ] = await connection.query ('SELECT * FROM tasks WHERE id = ?', [id]);

        if (resultado.length === 0){
            return res.status(404).send("tarea no encontrada")
        }
        res.json(resultado[0])
    } catch (error) {
        console.error('Error al obtener esta tarea:', error);
        return res.status(500).send('Error al obtener las tareas');
    } finally {
        await connection.end();
    }
}

export const postOnetask = async (req, res) => {
    let connection
    try {
        connection = await conexion();
        const { title, description, isComplete } = req.body;
        const values = [ title, description, isComplete]
        const [ resultado ] = await connection.query("INSERT INTO tasks (title, description, isComplete) VALUES (?, ?, ?)", values);

        if (resultado.affectedRows == 0){
            return res.send("no se pudo agregar la tarea")
        }

        res.status(201).send("tarea agregada correctamente")
    } catch (error) {
        console.error('Error al insertar esta tarea:', error);
        return res.status(500).send('Error al crear las tareas');
    } finally {
        await connection.end()
    }
};

export const putOnetask = async (req, res) => {
    let connection
    try {
        connection = await conexion();
        const { id } = req.params;
        const { title, description, isComplete } = req.body;
        const values = [ title, description, isComplete, id]
        const [ resultado ] = await connection.query("UPDATE tasks SET title = ?, description = ?, isComplete = ? WHERE id = ?", values);

        if (resultado.affectedRows == 0) {
            return res.send("no se actualizar la la tarea")
        }

        res.status(201).send("tarea actualizada correctamente")
    } catch (error) {
        console.error('Error al actualizar esta tarea:', error);
        return res.status(500).send('Error al crear las tareas');
    } finally {
        await connection.end();
    }
};

export const delOnetask = async (req, res) =>{
    let connection 
    try {
        connection = await conexion()
        const { id } = req.params;
        const [ resultado ] = await connection.query("DELETE FROM tasks WHERE id = ?", [id]);
        
        if (resultado.affectedRows == 0){
            return res.send("la tarea no se pudo borrar")
        }

        res.status(201).send("tarea eliminada con exito")
    } catch (error) {
        console.error('Error al eliminar esta tarea:', error);
        return res.status(500).send('Error al eliminar');
    } finally {
        await connection.end();
    }
}
