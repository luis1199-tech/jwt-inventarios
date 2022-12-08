const jwt = require('jsonwebtoken');
const Usuario = require('../models/Usuario');


const generarJWT = (usuario) => {
    const payload = { _id: usuario._id, nombre: usuario.nombre, email: usuario.email, estado: usuario.estado, rol: usuario.rol };
    const token = jwt.sign(payload, '82729918hdgdh', { expiresIn: '1h'});
    return token;
} 

module.exports = {
    generarJWT
}