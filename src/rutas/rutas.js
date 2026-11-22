//RUTAS DE API
//Se encarga de definir las rutas de la API y asociarlas con los controladores correspondientes.
const express = require('express');
const router = express.Router();
const UsuarioControlador = require('../controlador/usuarioControlador');


//Ruta para obtener todos los usuarios
router.get('/', UsuarioControlador.obtenerUsuarios);
router.get('/:id', UsuarioControlador.obtenerUsuarioPorId);

router.post('/', UsuarioControlador.crear);
router.put('/:id', UsuarioControlador.actualizar);
router.delete('/:id', UsuarioControlador.eliminar); 

module.exports = router;