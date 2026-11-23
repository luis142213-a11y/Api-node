const express = require('express');
const router = express.Router();
const ctrl = require('../controlador/detallePedidoControlador');

router.get('/resumen/ventas', ctrl.getResumenVentas);
router.get('/pedido/:idPedido', ctrl.getDetallePorPedido);
router.get('/', ctrl.getDetalles);
router.get('/:id', ctrl.getDetalleById);
router.post('/', ctrl.createDetalle);
router.put('/:id', ctrl.updateDetalle);
router.delete('/:id', ctrl.deleteDetalle);

module.exports = router;