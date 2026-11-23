const categoriaModelo = require("../modelo/categoriaModelo");

const getCategorias = async (req, res) => {
  try {
    const categorias = await categoriaModelo.obtenerTodas();
    res.json(categorias);
  } catch (error) {
    res.status(500).json({ error: "Error al obtener categorías", detalle: error.message });
  }
};

const getCategoriaById = async (req, res) => {
  try {
    const { id } = req.params;
    const categoria = await categoriaModelo.obtenerPorId(id);
    if (!categoria) {
      return res.status(404).json({ mensaje: "Categoría no encontrada" });
    }
    res.json(categoria);
  } catch (error) {
    res.status(500).json({ error: "Error al consultar categoría", detalle: error.message });
  }
};

const createCategoria = async (req, res) => {
  try {
    const { nombre, descripcion } = req.body;
    if (!nombre || !nombre.trim()) {
      return res.status(400).json({ mensaje: "El campo 'nombre' es obligatorio" });
    }
    const nueva = await categoriaModelo.crear({ nombre: nombre.trim(), descripcion });
    res.status(201).json(nueva);
  } catch (error) {
    res.status(500).json({ error: "Error al crear categoría", detalle: error.message });
  }
};

const updateCategoria = async (req, res) => {
  try {
    const { id } = req.params;
    const { nombre, descripcion } = req.body;
    if (!nombre || !nombre.trim()) {
      return res.status(400).json({ mensaje: "El campo 'nombre' es obligatorio" });
    }
    const actualizada = await categoriaModelo.actualizar(id, {
      nombre: nombre.trim(),
      descripcion,
    });
    if (!actualizada) {
      return res.status(404).json({ mensaje: "Categoría no encontrada" });
    }
    res.json({ mensaje: "Categoría actualizada correctamente" });
  } catch (error) {
    res.status(500).json({ error: "Error al actualizar categoría", detalle: error.message });
  }
};

const deleteCategoria = async (req, res) => {
  try {
    const { id } = req.params;
    const eliminada = await categoriaModelo.eliminar(id);
    if (!eliminada) {
      return res.status(404).json({ mensaje: "Categoría no encontrada" });
    }
    res.json({ mensaje: "Categoría eliminada correctamente" });
  } catch (error) {
    res.status(500).json({ error: "Error al eliminar categoría", detalle: error.message });
  }
};

module.exports = {
  getCategorias,
  getCategoriaById,
  createCategoria,
  updateCategoria,
  deleteCategoria,
};