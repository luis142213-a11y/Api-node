const express = require("express");
const router = express.Router();
const ctrl = require("../controlador/detallePedidoControlador");

// Rutas específicas antes de /:id
router.get("/resumen/ventas", ctrl.getResumenVentas);
router.get("/pedido/:idPedido", ctrl.getDetallePorPedido);

router.get("/", ctrl.getDetalles);
router.get("/:id", ctrl.getDetalleById);
router.post("/", ctrl.createDetalle);
router.put("/:id", ctrl.updateDetalle);
router.delete("/:id", ctrl.deleteDetalle);

module.exports = router;