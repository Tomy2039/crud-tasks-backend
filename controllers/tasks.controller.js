import { conexion } from '../db/database.js'

export const getAllTasks = (req, res) => {
    const getConnection = conexion();
    getConnection.connect(err => {
        if (err) {
            console.error('Error conectando a la base de datos:', err);
            return res.status(500).send('Error conectando a la base de datos');
        }

        getConnection.query('SELECT * FROM tasks', (err, results) => {
            if (err) {
                console.error('Error al obtener las tareas:', err);
                return res.status(500).send('Error al obtener las tareas');
            }
            res.json(results);
            getConnection.end();
        });
    });
};

export const getOnetask = (req, res) =>{
    const getConnection = conexion();
    const { id } = req.params;

    getConnection.connect(err => {
        if (err) {
            console.error('Error conectando a la base de datos:', err);
            return res.status(500).send('Error conectando a la base de datos');
        }

        const values = [id];
        getConnection.query('SELECT * FROM tasks WHERE id = ?', values, (err, results) => {
            if (err) {
                console.error('Error al obtener esta tarea:', err);
                return res.status(500).send('Error al obtener las tareas');
            }
            res.json(results[0]);
            getConnection.end();

            if (results.length === 0) {
                return res.status(404).send('tarea no encontrada');
            }
        });
    })
}

export const postOnetask = (req, res) => {
    const getConnection = conexion();
    const { title, description, isComplete } = req.body;
    getConnection.connect(err => {
        if (err) {
            console.error('Error conectando a la base de datos:', err);
            return res.status(500).send('Error conectando a la base de datos');
        }
        const values = [title, description, isComplete];

        getConnection.query('INSERT INTO tasks (title, description, isComplete) VALUES (?, ?, ?)', values, (err, results) => {
            if (err) {
                console.error('Error al insertar esta tarea:', err);
                return res.status(500).send('Error al crear las tareas');
            } else {
                return res.status(201).send('tarea creada correctamente')
            }
            res.json(results);
            getConnection.end();
        });
    })
}

export const putOnetask = (req, res) => {
    const getConnection = conexion()
    const { id } = req.params;
    const { title, description, isComplete } = req.body;

    getConnection.connect(err => {
        if (err) {
            console.error('Error conectando a la base de datos:', err);
            return res.status(500).send('Error conectando a la base de datos');
        }

        const values = [title, description, isComplete, id]
        getConnection.query('UPDATE tasks SET title = ?, description = ?, isComplete = ? WHERE id = ?', values, (err, results) =>{
            if (err) {
                console.error('Error al actualizar esta tarea:', err);
                return res.status(500).send('Error al crear las tareas');
            } else {
                return res.status(200).send('Tarea actualizada con exito');
            }

            if (results.length === 0) {
                return res.status(404).send('tarea no encontrada')
            }

            res.send(results);
            getConnection.end();
        })
    })

}

export const delOnetask = (req, res) =>{
    const getConnection = conexion()
    const { id } = req.params;

    getConnection.connect(err => {
        if (err) {
            console.error('Error conectando a la base de datos:', err);
            return res.status(500).send('Error conectando a la base de datos');
        }

        const values = [id];
        getConnection.query('DELETE FROM tasks WHERE id = ?', values, (err, results) => {
            if (err) {
                console.error('Error al eliminar esta tarea:', err);
                return res.status(500).send('Error al eliminar');
            } else {
                return res.status(200).send('tarea eliminada con exito');
            }

            res.json(results);
            getConnection.end();

            if (results.length === 0) {
                return res.status(404).send('tarea no encontrada');
            }
        });
    })
}
