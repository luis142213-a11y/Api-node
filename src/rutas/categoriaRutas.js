const express = require("express");
const router = express.Router();
const ctrl = require("../controlador/categoriaControlador");

router.get("/", ctrl.getCategorias);
router.get("/:id", ctrl.getCategoriaById);
router.post("/", ctrl.createCategoria);
router.put("/:id", ctrl.updateCategoria);
router.delete("/:id", ctrl.deleteCategoria);

module.exports = router;