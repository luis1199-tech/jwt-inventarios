const { Router } = require('express');
const { validationResult, check } = require('express-validator');
const router = Router();
const Usuario = require('../models/Usuario');

router.get('/', async function(req, res) {
    try {
        const usuarios = await Usuario.find();
        res.send(usuarios);
    } catch(error) {
        console.log(error);
        res.send('Ocurrio un error');
    }
});

router.post('/', [ 
        check('nombre', 'nombre.requerido').not().isEmpty(),
        check('email', 'email.requerido').isEmail(),
        check('estado', 'estado.requerido').isIn(['Activo', 'Inactivo']) ],
    async function(req, res) {
        try {
            const existeUsuario = await Usuario.findOne({ email: req.body.email });
            if (existeUsuario) {
                return res.status(400).send('Email ya existe');
            }

            const errors = validationResult(req);
            if (!errors.isEmpty()) {
                return res.status(400).json({ messages: errors.array() });
            }
    
            let usuario = new Usuario();
            usuario.nombre = req.body.nombre;
            usuario.email = req.body.email;
            usuario.estado = req.body.estado;
            usuario.fechaCreacion = new Date();
            usuario.fechaActualizacion = new Date();
            
            usuario = await usuario.save();

            res.send(usuario);
        } catch(error) {
            console.log(error);
            res.status(500).send('Ocurrio un error');
        }
});

router.put('/:usuarioId', [
        check('nombre', 'nombre.requerido').not().isEmpty(),
        check('email', 'email.requerido').isEmail(),
        check('estado', 'estado.requerido').isIn(['Activo', 'Inactivo']) ],
    async function(req, res){
        try {
            let usuario = await Usuario.findById(req.params.usuarioId);
            if (!usuario) {
                return res.status(400).send('Usuario no existe');
            }
        
            const existeUsuario = await Usuario.findOne({ email: req.body.email, _id: { $ne: usuario._id  } });
            if (existeUsuario) {
                return res.status(400).send('Email ya existe');
            }

            const errors = validationResult(req);
            if (!errors.isEmpty()) {
                return res.status(400).json({ messages: errors.array() });
            }
    
            usuario.email = req.body.email;
            usuario.nombre = req.body.nombre;
            usuario.estado = req.body.estado;
            usuario.fechaActualizacion = new Date();

            usuario = await usuario.save();
        
            res.send(usuario);
        } catch(error) {
            console.log(error);
            res.status(500).send('Ocurrio un error');
        }
});

module.exports = router;