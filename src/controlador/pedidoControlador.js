const pedidoModelo = require("../modelo/pedidoModelo");

const getPedidos = async (req, res) => {
  try {
    const pedidos = await pedidoModelo.obtenerTodos();
    res.json(pedidos);
  } catch (error) {
    res.status(500).json({ error: "Error al obtener pedidos", detalle: error.message });
  }
};

const getPedidosConCliente = async (req, res) => {
  try {
    const pedidos = await pedidoModelo.obtenerConCliente();
    res.json(pedidos);
  } catch (error) {
    res.status(500).json({ error: "Error al obtener pedidos con cliente", detalle: error.message });
  }
};

const getPedidoById = async (req, res) => {
  try {
    const pedido = await pedidoModelo.obtenerPorId(req.params.id);
    if (!pedido) {
      return res.status(404).json({ mensaje: "Pedido no encontrado" });
    }
    res.json(pedido);
  } catch (error) {
    res.status(500).json({ error: "Error al consultar pedido", detalle: error.message });
  }
};

const createPedido = async (req, res) => {
  try {
    const { id_cliente, fecha_pedido, estado, total } = req.body;
    if (!id_cliente) {
      return res.status(400).json({ mensaje: "El campo 'id_cliente' es obligatorio" });
    }
    const nuevo = await pedidoModelo.crear({ id_cliente, fecha_pedido, estado, total });
    res.status(201).json(nuevo);
  } catch (error) {
    res.status(500).json({ error: "Error al crear pedido", detalle: error.message });
  }
};

const updatePedido = async (req, res) => {
  try {
    const { id_cliente, fecha_pedido, estado, total } = req.body;
    if (!id_cliente) {
      return res.status(400).json({ mensaje: "El campo 'id_cliente' es obligatorio" });
    }
    const actualizado = await pedidoModelo.actualizar(req.params.id, {
      id_cliente,
      fecha_pedido,
      estado,
      total,
    });
    if (!actualizado) {
      return res.status(404).json({ mensaje: "Pedido no encontrado" });
    }
    res.json({ mensaje: "Pedido actualizado correctamente" });
  } catch (error) {
    res.status(500).json({ error: "Error al actualizar pedido", detalle: error.message });
  }
};

const deletePedido = async (req, res) => {
  try {
    const eliminado = await pedidoModelo.eliminar(req.params.id);
    if (!eliminado) {
      return res.status(404).json({ mensaje: "Pedido no encontrado" });
    }
    res.json({ mensaje: "Pedido eliminado correctamente" });
  } catch (error) {
    res.status(500).json({ error: "Error al eliminar pedido", detalle: error.message });
  }
};

module.exports = {
  getPedidos,
  getPedidosConCliente,
  getPedidoById,
  createPedido,
  updatePedido,
  deletePedido,
};