//RUTAS DE API
//Se encarga de definir las rutas de la API y asociarlas con los controladores correspondientes.
const express = require('express');
const router = express.Router();
const EmpleadosControlador = require('../controlador/empleadosControlador');


//Ruta para obtener todos los empleados
router.get('/', EmpleadosControlador.obtenerEmpleados);
router.get('/:id', EmpleadosControlador.obtenerEmpleadoPorId);

router.post('/', EmpleadosControlador.crearEmpleado);

router.put('/:id', EmpleadosControlador.actualizarEmpleado);
router.delete('/:id', EmpleadosControlador.eliminarEmpleado);


module.exports = router;