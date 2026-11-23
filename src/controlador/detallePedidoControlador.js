const detalleModelo = require('../modelo/detallePedidoModelo');

const getDetalles = async (req, res) => {
  try {
    const detalles = await detalleModelo.obtenerTodos();
    res.json(detalles);
  } catch (error) {
    res.status(500).json({ error: 'Error al obtener detalles de pedido', detalle: error.message });
  }
};

const getDetalleById = async (req, res) => {
  try {
    const detalle = await detalleModelo.obtenerPorId(req.params.id);
    if (!detalle) {
      return res.status(404).json({ mensaje: 'Detalle de pedido no encontrado' });
    }
    res.json(detalle);
  } catch (error) {
    res.status(500).json({ error: 'Error al consultar detalle', detalle: error.message });
  }
};

const getDetallePorPedido = async (req, res) => {
  try {
    const filas = await detalleModelo.obtenerPorPedido(req.params.idPedido);
    res.json(filas);
  } catch (error) {
    res.status(500).json({ error: 'Error al obtener detalle del pedido', detalle: error.message });
  }
};

const getResumenVentas = async (req, res) => {
  try {
    const resumen = await detalleModelo.obtenerResumenVentasPorProducto();
    res.json(resumen);
  } catch (error) {
    res.status(500).json({ error: 'Error al generar resumen de ventas', detalle: error.message });
  }
};

const createDetalle = async (req, res) => {
  try {
    const { id_detalle, id_pedido, id_producto, cantidad, precio_unitario } = req.body;
    if (!id_pedido || !id_producto || !cantidad || precio_unitario === undefined) {
      return res.status(400).json({
        mensaje: "Los campos 'id_pedido', 'id_producto', 'cantidad' y 'precio_unitario' son obligatorios",
      });
    }
    const nuevo = await detalleModelo.crear({
      id_detalle: id_detalle ?? null,
      id_pedido,
      id_producto,
      cantidad,
      precio_unitario,
    });
    res.status(201).json({
      mensaje: 'Detalle de pedido creado correctamente',
      data: nuevo,
    });
  } catch (error) {
    res.status(500).json({ error: 'Error al crear detalle de pedido', detalle: error.message });
  }
};

const updateDetalle = async (req, res) => {
  try {
    const { id_pedido, id_producto, cantidad, precio_unitario } = req.body;
    if (!id_pedido || !id_producto || !cantidad || precio_unitario === undefined) {
      return res.status(400).json({
        mensaje: "Los campos 'id_pedido', 'id_producto', 'cantidad' y 'precio_unitario' son obligatorios",
      });
    }
    const actualizado = await detalleModelo.actualizar(req.params.id, {
      id_pedido,
      id_producto,
      cantidad,
      precio_unitario,
    });
    if (!actualizado) {
      return res.status(404).json({ mensaje: 'Detalle de pedido no encontrado' });
    }
    res.json({ mensaje: 'Detalle de pedido actualizado correctamente' });
  } catch (error) {
    res.status(500).json({ error: 'Error al actualizar detalle', detalle: error.message });
  }
};

const deleteDetalle = async (req, res) => {
  try {
    const eliminado = await detalleModelo.eliminar(req.params.id);
    if (!eliminado) {
      return res.status(404).json({ mensaje: 'Detalle de pedido no encontrado' });
    }
    res.json({ mensaje: 'Detalle de pedido eliminado correctamente' });
  } catch (error) {
    res.status(500).json({ error: 'Error al eliminar detalle', detalle: error.message });
  }
};

module.exports = {
  getDetalles,
  getDetalleById,
  getDetallePorPedido,
  getResumenVentas,
  createDetalle,
  updateDetalle,
  deleteDetalle,
};