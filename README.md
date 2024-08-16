# Proyecto guardar tareas

Este proyecto consiste en buscar, guardar, eliminar, y editar tareas de acuerdo a su titulo, descripcion y si lo cumple o no 

# requisitos

-node.js
-Mysql

# Pasos para crear la base de datos y correr el servidor
Paso 1:crea una base de datos:

Crea primero la base de datos en mysql de acuerdo con esta linea de codigo y usala:

CREATE DATABASE tasks_db;
USE tasks_db,

Despues crea la tabla tasks:

CREATE TABLE tasks (
    id INT AUTO_INCREMENT PRIMARY KEY,
    title VARCHAR(255),
    description TEXT,
    isComplete BOOLEAN
);

Paso 2:configura la base de datos:

una vez creado la base de datos tiene que hacer lo siguiente:
dirijete a la carpeta db y entra en database.js:

const mysql = require('mysql2');

const conexion = () => {
    return mysql.createConnection({
        host: 'localhost',
        user: 'root', 
        password: '',
        database: 'tasks_db'
    });
};

module.exports = conexion;

reemplaza el nombre, la contraseña y el database por tu nombre, contraseña y el nombre de la base de datos que has creado y despues aprite las ctrl s para guardar los cambios

Paso 3: iniciar tu servidor:

abre primero tu terminal con ctrl j para poder instalar node modules para que el servidor pueda funcionar asegurate de estar en la terminarl de crud-tasks-backend, una vez estado alli escribe npm install y dale enter para que se instale y despues aprieta guardar con ctrl s para actualizar el servidor

una vez tenido el node_modules dirijete hacia al package.json para poder ver el nombre del script en donde en tu terminal lo vas correr
 "scripts": {
    "test": "echo \"Error: no test specified\" && exit 1",
    "server": "node --watch index.js"
}

en este caso el nombre es server asi ve a tu terminal y escribe npm run server y aprieta enter para que el servidor pueda correr.

te vas a darte cuenta que funciona cuando en tu terminal diga:
Servidor corriendo en el puerto 4000

# Configuracion para las funcionalidades a traves de la url y el puerto del servidor:

Si ya esta funcionando todo el servidor es hora de hacer uso de las rutas 
puedes descargar el postman para realizar las funcionalidades a partir del puerto 4000 o si estas usando visual studio code puedes descargar dentro de este el thunder client que es una extension del visual:

escribi la url primere:
http://localhost:4000/tasks

ve a headers y en la columna donde dice key escribe Content-Type y a la de este donde value escribir application/json
te dirijes a body y aprieta en la opcion raw para poder escribir los datos de acuerdo con lo siguiente:

{
  "title": "futbol",
  "description": "futbol at 12:30am",
  "isComplete": 0
}

este es un ejemplo en la parte de title y descripcion puedes escribir el titulo y la descripcion especifica eso si, que esten dentro de las comillas doble mientras que en la parte isComplete puedes agregar dos opcion 0 para falso y 1 para verdadero, esto para que es? para que confirmes si haz completado o no la tarea.

# Funcionalidades:

Una vez preparado todo ya puedes iniciar con las funcionalidades que se estructura de esta manera:

-Buscar:
Para buscar todas la lista de tareas dirije al postman o thunder y en la parte izquierda de la url asegurate de que dice get, si lo esta aprieta el boton send para poder ver el resto de la lista aunque por ser primera vez solo te aparecera dos corchetes [] lo cual es algo bueno ya que esto significa que tu base de datos esta funcionando correctamente:

http://localhost:4000/tasks

-Buscar por id:
si ya tienes las tareas ingresar y para poder buscarlas individualmente solo tienes que escribir esto

http://localhost:4000/tasks/id

en la parte donde dice id es donde tienes que escribir el numero del id disponible en tu base de datos por ejemplo si quiero buscar el id 3 escribo asi:

http://localhost:4000/tasks/3

-Insertar
Para insertar las tareas tienes que hacer lo siguiente:
cambia primero en donde en get y pulsa opcion post y el luego escribe esto en raw:
{
  "title": "",
  "description": "",
  "isComplete": 
}

escribi el nombre y la descripcion en donde esta los comillas vacias y no te olvides de agregar 0 o 1 en isComplete para saber si cumple o no la tarea asignada.

ejemplo:
{
  "title": "futbol",
  "description": "futbol at 12:30am",
  "isComplete": 0
}

Al escribir esto y al darle send a la primera vez te saltara el mensaje de que "tarea creada correctamente" y si vas a tu lista de tareas utilizando el get te mostrara la tarea asignada junto con el numero de id 

-Editar
para editar tareas tienes que hacer por medio del numero de la id primero cambia la opcion de get en tu postman o thunder por el put para editar las tareas, asegurate de que esta id y el resto existan:

http://localhost:4000/tasks/id

en la parte donde dice id es donde tienes que escribir el numero del id disponible en tu base de datos por ejemplo si quiero editar el id 3 escribo asi:

http://localhost:4000/tasks/3

y despues dirije a tu raw y empieza a editar reescribiendo el titulo, la descripcion y el cumplimiento:

{
  "title": "",
  "description": "",
  "isComplete": 
}

si por ejemplo si estoy en la id numero 3 y la base de datos tengo estos datos:

{
  "title": "futbol",
  "description": "futbol at 12:30am",
  "isComplete": 0
}

y los quiero cambiarlos por estos:

{
  "title": "Voley",
  "description": "Voley at 10:30pm",
  "isComplete": 1
}

al hacer escribir este cambio y al presionar send se actualizara la base de datos con los cambios que has hecho

-Eliminar
Para eliminar una tarea especifica primero cambia la opcion de la ruta y selecciona delete y despues escribis tu url y con el id que quieres eliminar:

http://localhost:4000/tasks/id

Ejemplo quiere eliminar este id que tiene esta tarea

http://localhost:4000/tasks/3

{
  "title": "Voley",
  "description": "Voley at 10:30pm",
  "isComplete": 1
}

solamente basta con que elijas la opcion delete, escribas la url con la id especificada y luego apretar send para poder eliminar y veras que una vez realizado la accion veras que en tu base de datos de tu lista de tareas se ha eliminado la tarea con la id con la que decidiste eliminar










