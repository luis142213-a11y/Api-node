const express = require('express');
const router = express.Router();
const ctrl = require('../controlador/pedidoControlador');

router.get('/clientes', ctrl.getPedidosConCliente);
router.get('/', ctrl.getPedidos);
router.get('/:id', ctrl.getPedidoById);
router.post('/', ctrl.createPedido);
router.put('/:id', ctrl.updatePedido);
router.delete('/:id', ctrl.deletePedido);

module.exports = router;