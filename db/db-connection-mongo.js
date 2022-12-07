const mongoose = require('mongoose');

const getConnection = async () => {
    try {
        const url = 'mongodb://luisnavarro:estacion1001@ac-nmwuk1i-shard-00-00.7wgft36.mongodb.net:27017,ac-nmwuk1i-shard-00-01.7wgft36.mongodb.net:27017,ac-nmwuk1i-shard-00-02.7wgft36.mongodb.net:27017/jwt-inventario?ssl=true&replicaSet=atlas-2vvt8g-shard-0&authSource=admin&retryWrites=true&w=majority';   

        await mongoose.connect(url);

        console.log('Conexion exitosa');
    } catch (error) {
        console.log(error);
        throw new   Error('Error de coneccion a la Base de datos');
    }
}

module.exports = {
    getConnection,
}