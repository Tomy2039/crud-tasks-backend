const conexion = require('../db/database');
const getConnection = require('../db/database');

const getAllTasks = (req, res) => {
    const conexion = getConnection();
    conexion.connect(err => {
        if (err) {
            console.error('Error conectando a la base de datos:', err);
            return res.status(500).send('Error conectando a la base de datos');
        }

        conexion.query('SELECT * FROM tasks', (err, results) => {
            if (err) {
                console.error('Error al obtener las tareas:', err);
                return res.status(500).send('Error al obtener las tareas');
            }
            res.json(results);
            conexion.end();
        });
    });
};

const getOnetask = (req, res) =>{
    const conexion = getConnection();
    const { id } = req.params;

    conexion.connect(err => {
        if (err) {
            console.error('Error conectando a la base de datos:', err);
            return res.status(500).send('Error conectando a la base de datos');
        }

        const values = [id];
        conexion.query('SELECT * FROM tasks WHERE id = ?', values, (err, results) => {
            if (err) {
                console.error('Error al obtener esta tarea:', err);
                return res.status(500).send('Error al obtener las tareas');
            }
            res.json(results[0]);
            conexion.end();

            if (results.length === 0) {
                return res.status(404).send('tarea no encontrada');
            }
        });
    })
}

const postOnetask = (req, res) => {
    const conexion = getConnection();
    const { title, description, isComplete } = req.body;
    conexion.connect(err => {
        if (err) {
            console.error('Error conectando a la base de datos:', err);
            return res.status(500).send('Error conectando a la base de datos');
        }
        const values = [title, description, isComplete];

        conexion.query('INSERT INTO tasks (title, description, isComplete) VALUES (?, ?, ?)', values, (err, results) => {
            if (err) {
                console.error('Error al insertar esta tarea:', err);
                return res.status(500).send('Error al crear las tareas');
            } else {
                return res.status(200).send('tarea insertada correctamente')
            }
            res.json(results);
            conexion.end();
        });
    })
}

const putOnetask = (req, res) => {
    const conexion = getConnection();
    const { id } = req.params;
    const { title, description, isComplete } = req.body;

    conexion.connect(err => {
        if (err) {
            console.error('Error conectando a la base de datos:', err);
            return res.status(500).send('Error conectando a la base de datos');
        }

        const values = [title, description, isComplete, id]
        conexion.query('UPDATE tasks SET title = ?, description = ?, isComplete = ? WHERE id = ?', values, (err, results) =>{
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
            conexion.end();
        })
    })

}

module.exports = {
    getAllTasks,
    getOnetask,
    postOnetask,
    putOnetask,
}