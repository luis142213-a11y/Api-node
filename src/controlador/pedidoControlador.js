const pedidoModelo = require('../modelo/pedidoModelo');

const getPedidos = async (req, res) => {
  try {
    const pedidos = await pedidoModelo.obtenerTodos();
    res.json(pedidos);
  } catch (error) {
    res.status(500).json({ error: 'Error al obtener pedidos', detalle: error.message });
  }
};

const getPedidosConCliente = async (req, res) => {
  try {
    const pedidos = await pedidoModelo.obtenerConCliente();
    res.json(pedidos);
  } catch (error) {
    res.status(500).json({ error: 'Error al obtener pedidos con cliente', detalle: error.message });
  }
};

const getPedidoById = async (req, res) => {
  try {
    const pedido = await pedidoModelo.obtenerPorId(req.params.id);
    if (!pedido) {
      return res.status(404).json({ mensaje: 'Pedido no encontrado' });
    }
    res.json(pedido);
  } catch (error) {
    res.status(500).json({ error: 'Error al consultar pedido', detalle: error.message });
  }
};

const createPedido = async (req, res) => {
  try {
    const { id_pedido, id_cliente, id_empleado, fecha_pedido, canal } = req.body;
    if (!fecha_pedido || !canal) {
      return res.status(400).json({
        mensaje: "Los campos 'fecha_pedido' y 'canal' son obligatorios",
      });
    }
    const nuevo = await pedidoModelo.crear({
      id_pedido: id_pedido ?? null,
      id_cliente: id_cliente ?? null,
      id_empleado: id_empleado ?? null,
      fecha_pedido,
      canal: canal.trim(),
    });
    res.status(201).json({
      mensaje: 'Pedido creado correctamente',
      data: nuevo,
    });
  } catch (error) {
    res.status(500).json({ error: 'Error al crear pedido', detalle: error.message });
  }
};

const updatePedido = async (req, res) => {
  try {
    const { id_cliente, id_empleado, fecha_pedido, canal } = req.body;
    if (!fecha_pedido || !canal) {
      return res.status(400).json({
        mensaje: "Los campos 'fecha_pedido' y 'canal' son obligatorios",
      });
    }
    const actualizado = await pedidoModelo.actualizar(req.params.id, {
      id_cliente: id_cliente ?? null,
      id_empleado: id_empleado ?? null,
      fecha_pedido,
      canal: canal.trim(),
    });
    if (!actualizado) {
      return res.status(404).json({ mensaje: 'Pedido no encontrado' });
    }
    res.json({ mensaje: 'Pedido actualizado correctamente' });
  } catch (error) {
    res.status(500).json({ error: 'Error al actualizar pedido', detalle: error.message });
  }
};

const deletePedido = async (req, res) => {
  try {
    const eliminado = await pedidoModelo.eliminar(req.params.id);
    if (!eliminado) {
      return res.status(404).json({ mensaje: 'Pedido no encontrado' });
    }
    res.json({ mensaje: 'Pedido eliminado correctamente' });
  } catch (error) {
    res.status(500).json({ error: 'Error al eliminar pedido', detalle: error.message });
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