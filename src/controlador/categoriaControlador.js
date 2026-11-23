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
    const { id_categoria, nombre } = req.body;
    if (!nombre || !nombre.trim()) {
      return res.status(400).json({ mensaje: "El campo 'nombre' es obligatorio" });
    }
    const nueva = await categoriaModelo.crear({
      id_categoria: id_categoria ?? null,
      nombre: nombre.trim(),
    });
    res.status(201).json({
      mensaje: 'Categoría creada correctamente',
      data: nueva,
    });
  } catch (error) {
    if (error.code === 'ER_DUP_ENTRY') {
      return res.status(400).json({ mensaje: 'Ya existe una categoría con ese ID o nombre' });
    }
    res.status(500).json({ error: 'Error al crear categoría', detalle: error.message });
  }
};

const updateCategoria = async (req, res) => {
  try {
    const { nombre } = req.body;
    if (!nombre || !nombre.trim()) {
      return res.status(400).json({ mensaje: "El campo 'nombre' es obligatorio" });
    }
    const actualizada = await categoriaModelo.actualizar(req.params.id, {
      nombre: nombre.trim(),
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