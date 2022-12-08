const express = require('express');
const { getConnection } = require('./db/db-connection-mongo');
const cors = require('cors');

const app = express();
const port = 4000;

app.use(cors());

getConnection();

// Parseo JSON
app.use(express.json());

app.use('/usuario', require('./routes/usuario'));
app.use('/estado-equipo', require('./routes/estadoEquipo'));
app.use('/marca', require('./routes/marca'));
app.use('/tipo-equipo', require('./routes/tipoEquipo'));
app.use('/inventario', require('./routes/inventario'));
app.use('/login', require('./routes/login')); //nueva ruta para el servicio de login

app.listen(port, () => {
    console.log(`La aplicacion se escucha en el puerto ${port}`)
});