const { Router } = require('express');
const { validationResult, check } = require('express-validator');
const Usuario = require('../models/Usuario');
const bycript = require('bcryptjs');// para incriptar la contraseña

const router = Router();

router.post('/', [
    check('email', 'email.requerido').isEmail(),
    check('contrasena', 'contrasena.requerido').not().isEmpty()
], async function(req, res) {
    try{
        const errors = validationResult(req);
        if (!errors.isEmpty()){
            return res.status(400).json({  mensaje: errors.array() });
        }

        const usuario = await Usuario.findOne({ email: req.body.email });
        if(!usuario) {
            return res.status(400).json({ mensaje: 'Usuario no encontrado'});
        }
         //comparar que las contraseñas no sean iguales del usuario
        const esIgual = bycript.compareSync(req.body.contrasena, usuario.contrasena);
        if(!esIgual) {
            return res.status(400).json({ mensaje: 'Usuario no encontrado'});
        }

        res.json({ _id: usuario._id, nombre: usuario.nombre, 
            email: usuario.email, estado: usuario.estado, rol: usuario.rol })

    }catch(error){
        console.log(error);
        res.status(500).json({ mensaje: 'internal server error'});
    }
});

module.exports = router;