import { conexion } from '../db/database.js'

export const getAllTasks = (req, res) => {
    const connection = conexion();
    connection.connect(err => {
        if (err) {
            console.error('Error conectando a la base de datos:', err);
            return res.status(500).send('Error conectando a la base de datos');
        }

        connection.query('SELECT * FROM tasks', (err, results) => {
            if (err) {
                console.error('Error al obtener las tareas:', err);
                return res.status(500).send('Error al obtener las tareas');
            }
            res.json(results);
            connection.end();
        });
    });
};

export const getOnetask = (req, res) =>{
    const connection = conexion();
    const { id } = req.params;

    connection.connect(err => {
        if (err) {
            console.error('Error conectando a la base de datos:', err);
            return res.status(500).send('Error conectando a la base de datos');
        }

        const values = [id];
        connection.query('SELECT * FROM tasks WHERE id = ?', values, (err, results) => {
            if (err) {
                console.error('Error al obtener esta tarea:', err);
                return res.status(500).send('Error al obtener las tareas');
            }
            res.json(results[0]);
            connection.end();

            if (results.length === 0) {
                return res.status(404).send('tarea no encontrada');
            }
        });
    })
}

export const postOnetask = (req, res) => {
    const connection = conexion();
    const { title, description, isComplete } = req.body;
    connection.connect(err => {
        if (err) {
            console.error('Error conectando a la base de datos:', err);
            return res.status(500).send('Error conectando a la base de datos');
        }
        const values = [title, description, isComplete];

        connection.query('INSERT INTO tasks (title, description, isComplete) VALUES (?, ?, ?)', values, (err, results) => {
            if (err) {
                console.error('Error al insertar esta tarea:', err);
                return res.status(500).send('Error al crear las tareas');
            }

            res.json(results);
            connection.end();

            if (!err) {
                return res.status(201).send('tarea creada correctamente')
            }
        });
    })
}

export const putOnetask = (req, res) => {
    const connection = conexion()
    const { id } = req.params;
    const { title, description, isComplete } = req.body;

    connection.connect(err => {
        if (err) {
            console.error('Error conectando a la base de datos:', err);
            return res.status(500).send('Error conectando a la base de datos');
        }

        const values = [title, description, isComplete, id]
        connection.query('UPDATE tasks SET title = ?, description = ?, isComplete = ? WHERE id = ?', values, (err, results) =>{
            if (err) {
                console.error('Error al actualizar esta tarea:', err);
                return res.status(500).send('Error al crear las tareas');
            } 

            res.send(results);
            getConnection.end();

            if (!err) {
                return res.status(200).send('Tarea actualizada con exito');
            }

            if (results.length === 0) {
                return res.status(404).send('tarea no encontrada')
            }
        })
    })

}

export const delOnetask = (req, res) =>{
    const connection = conexion()
    const { id } = req.params;

    connection.connect(err => {
        if (err) {
            console.error('Error conectando a la base de datos:', err);
            return res.status(500).send('Error conectando a la base de datos');
        }

        const values = [id];
        connection.query('DELETE FROM tasks WHERE id = ?', values, (err, results) => {
            if (err) {
                console.error('Error al eliminar esta tarea:', err);
                return res.status(500).send('Error al eliminar');
            }

            res.json(results);
            connection.end();

            if (!err) {
                return res.status(200).send('tarea eliminada con exito');
            }

            if (results.length === 0) {
                return res.status(404).send('tarea no encontrada');
            }
        });
    })
}
