const clienteModelo = require('../modelo/clienteModelo');

const getClientes = async (req, res) => {
  try {
    const clientes = await clienteModelo.obtenerTodos();
    res.json(clientes);
  } catch (error) {
    res.status(500).json({ error: 'Error al obtener clientes', detalle: error.message });
  }
};

const getClienteById = async (req, res) => {
  try {
    const cliente = await clienteModelo.obtenerPorId(req.params.id);
    if (!cliente) {
      return res.status(404).json({ mensaje: 'Cliente no encontrado' });
    }
    res.json(cliente);
  } catch (error) {
    res.status(500).json({ error: 'Error al consultar cliente', detalle: error.message });
  }
};

const createCliente = async (req, res) => {
  try {
    const { id_cliente, nombre, ciudad, fecha_registro } = req.body;
    if (!nombre || !ciudad || !fecha_registro) {
      return res.status(400).json({
        mensaje: "Los campos 'nombre', 'ciudad' y 'fecha_registro' son obligatorios",
      });
    }
    const nuevo = await clienteModelo.crear({
      id_cliente: id_cliente ?? null,
      nombre: nombre.trim(),
      ciudad: ciudad.trim(),
      fecha_registro,
    });
    res.status(201).json({
      mensaje: 'Cliente creado correctamente',
      data: nuevo,
    });
  } catch (error) {
    res.status(500).json({ error: 'Error al crear cliente', detalle: error.message });
  }
};

const updateCliente = async (req, res) => {
  try {
    const { nombre, ciudad, fecha_registro } = req.body;
    if (!nombre || !ciudad || !fecha_registro) {
      return res.status(400).json({
        mensaje: "Los campos 'nombre', 'ciudad' y 'fecha_registro' son obligatorios",
      });
    }
    const actualizado = await clienteModelo.actualizar(req.params.id, {
      nombre: nombre.trim(),
      ciudad: ciudad.trim(),
      fecha_registro,
    });
    if (!actualizado) {
      return res.status(404).json({ mensaje: 'Cliente no encontrado' });
    }
    res.json({ mensaje: 'Cliente actualizado correctamente' });
  } catch (error) {
    res.status(500).json({ error: 'Error al actualizar cliente', detalle: error.message });
  }
};

const deleteCliente = async (req, res) => {
  try {
    const eliminado = await clienteModelo.eliminar(req.params.id);
    if (!eliminado) {
      return res.status(404).json({ mensaje: 'Cliente no encontrado' });
    }
    res.json({ mensaje: 'Cliente eliminado correctamente' });
  } catch (error) {
    res.status(500).json({ error: 'Error al eliminar cliente', detalle: error.message });
  }
};

module.exports = {
  getClientes,
  getClienteById,
  createCliente,
  updateCliente,
  deleteCliente,
};