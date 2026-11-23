const productoModelo = require("../modelo/productoModelo");

const getProductos = async (req, res) => {
  try {
    const productos = await productoModelo.obtenerTodos();
    res.json(productos);
  } catch (error) {
    res.status(500).json({ error: "Error al obtener productos", detalle: error.message });
  }
};

const getProductosConCategoria = async (req, res) => {
  try {
    const productos = await productoModelo.obtenerConCategoria();
    res.json(productos);
  } catch (error) {
    res.status(500).json({ error: "Error al obtener productos con categoría", detalle: error.message });
  }
};

const getProductoById = async (req, res) => {
  try {
    const producto = await productoModelo.obtenerPorId(req.params.id);
    if (!producto) {
      return res.status(404).json({ mensaje: "Producto no encontrado" });
    }
    res.json(producto);
  } catch (error) {
    res.status(500).json({ error: "Error al consultar producto", detalle: error.message });
  }
};

const createProducto = async (req, res) => {
  try {
    const { nombre, precio, stock, id_categoria } = req.body;
    if (!nombre || precio === undefined || !id_categoria) {
      return res.status(400).json({
        mensaje: "Los campos 'nombre', 'precio' e 'id_categoria' son obligatorios",
      });
    }
    const nuevo = await productoModelo.crear({ nombre, precio, stock, id_categoria });
    res.status(201).json(nuevo);
  } catch (error) {
    res.status(500).json({ error: "Error al crear producto", detalle: error.message });
  }
};

const updateProducto = async (req, res) => {
  try {
    const { nombre, precio, stock, id_categoria } = req.body;
    if (!nombre || precio === undefined || !id_categoria) {
      return res.status(400).json({
        mensaje: "Los campos 'nombre', 'precio' e 'id_categoria' son obligatorios",
      });
    }
    const actualizado = await productoModelo.actualizar(req.params.id, {
      nombre,
      precio,
      stock,
      id_categoria,
    });
    if (!actualizado) {
      return res.status(404).json({ mensaje: "Producto no encontrado" });
    }
    res.json({ mensaje: "Producto actualizado correctamente" });
  } catch (error) {
    res.status(500).json({ error: "Error al actualizar producto", detalle: error.message });
  }
};

const deleteProducto = async (req, res) => {
  try {
    const eliminado = await productoModelo.eliminar(req.params.id);
    if (!eliminado) {
      return res.status(404).json({ mensaje: "Producto no encontrado" });
    }
    res.json({ mensaje: "Producto eliminado correctamente" });
  } catch (error) {
    res.status(500).json({ error: "Error al eliminar producto", detalle: error.message });
  }
};

module.exports = {
  getProductos,
  getProductosConCategoria,
  getProductoById,
  createProducto,
  updateProducto,
  deleteProducto,
};