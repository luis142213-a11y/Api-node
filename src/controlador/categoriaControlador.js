const categoriaModelo = require('../modelo/categoriaModelo');

const getCategorias = async (req, res) => {
  try {
    const categorias = await categoriaModelo.obtenerTodas();
    res.json(categorias);
  } catch (error) {
    res.status(500).json({ error: 'Error al obtener categorías', detalle: error.message });
  }
};

const getCategoriaById = async (req, res) => {
  try {
    const categoria = await categoriaModelo.obtenerPorId(req.params.id);
    if (!categoria) {
      return res.status(404).json({ mensaje: 'Categoría no encontrada' });
    }
    res.json(categoria);
  } catch (error) {
    res.status(500).json({ error: 'Error al consultar categoría', detalle: error.message });
  }
};

const createCategoria = async (req, res) => {
  try {
    const { nombre_categoria } = req.body;
    if (!nombre_categoria || !nombre_categoria.trim()) {
      return res.status(400).json({ mensaje: "El campo 'nombre_categoria' es obligatorio" });
    }
    const nueva = await categoriaModelo.crear({
      nombre_categoria: nombre_categoria.trim(),
    });
    res.status(201).json({
      mensaje: 'Categoría creada correctamente',
      data: nueva,
    });
  } catch (error) {
    res.status(500).json({ error: 'Error al crear categoría', detalle: error.message });
  }
};

const updateCategoria = async (req, res) => {
  try {
    const { nombre_categoria } = req.body;
    if (!nombre_categoria || !nombre_categoria.trim()) {
      return res.status(400).json({ mensaje: "El campo 'nombre_categoria' es obligatorio" });
    }
    const actualizada = await categoriaModelo.actualizar(req.params.id, {
      nombre_categoria: nombre_categoria.trim(),
    });
    if (!actualizada) {
      return res.status(404).json({ mensaje: 'Categoría no encontrada' });
    }
    res.json({ mensaje: 'Categoría actualizada correctamente' });
  } catch (error) {
    res.status(500).json({ error: 'Error al actualizar categoría', detalle: error.message });
  }
};

const deleteCategoria = async (req, res) => {
  try {
    const eliminada = await categoriaModelo.eliminar(req.params.id);
    if (!eliminada) {
      return res.status(404).json({ mensaje: 'Categoría no encontrada' });
    }
    res.json({ mensaje: 'Categoría eliminada correctamente' });
  } catch (error) {
    res.status(500).json({ error: 'Error al eliminar categoría', detalle: error.message });
  }
};

module.exports = {
  getCategorias,
  getCategoriaById,
  createCategoria,
  updateCategoria,
  deleteCategoria,
};