const express = require('express');
const morgan = require('morgan');
const cors = require('cors');
const router = require('./routes/tasks.routes');

const app = express();

// Configuraciones
app.set('port', process.env.PORT || 4000);

// Middlewares
app.use(morgan('dev')); 
app.use(cors()); // Habilitar CORS para permitir solicitudes desde otros dominios
app.use(express.json()); // Parsear cuerpos de solicitudes JSON
app.use(router); // Usar las rutas definidas

// Iniciar el servidor
app.listen(app.get('port'), () => {
    console.log(`Servidor corriendo en el puerto ${app.get('port')}`);
});
