const express = require("express");
const router = express.Router();
const ctrl = require("../controlador/clienteControlador");

router.get("/", ctrl.getClientes);
router.get("/:id", ctrl.getClienteById);
router.post("/", ctrl.createCliente);
router.put("/:id", ctrl.updateCliente);
router.delete("/:id", ctrl.deleteCliente);

module.exports = router;