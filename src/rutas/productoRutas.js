const express = require('express');
const router = express.Router();
const ctrl = require('../controlador/productoControlador');

router.get('/categorias', ctrl.getProductosConCategoria);
router.get('/', ctrl.getProductos);
router.get('/:id', ctrl.getProductoById);
router.post('/', ctrl.createProducto);
router.put('/:id', ctrl.updateProducto);
router.delete('/:id', ctrl.deleteProducto);

module.exports = router;