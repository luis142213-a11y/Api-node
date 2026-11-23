const pool = require('../config/bd');

const obtenerTodas = async () => {
  const [rows] = await pool.query('SELECT id_categoria, nombre FROM categorias');
  return rows;
};

const obtenerPorId = async (id) => {
  const [rows] = await pool.query(
    'SELECT id_categoria, nombre FROM categorias WHERE id_categoria = ?',
    [id]
  );
  return rows[0] || null;
};

const crear = async ({ id_categoria = null, nombre }) => {
  if (id_categoria !== null) {
    await pool.query(
      'INSERT INTO categorias (id_categoria, nombre) VALUES (?, ?)',
      [id_categoria, nombre]
    );
    return { id_categoria, nombre };
  }
  const [result] = await pool.query(
    'INSERT INTO categorias (nombre) VALUES (?)',
    [nombre]
  );
  return { id_categoria: result.insertId, nombre };
};

const actualizar = async (id, { nombre }) => {
  const [result] = await pool.query(
    'UPDATE categorias SET nombre = ? WHERE id_categoria = ?',
    [nombre, id]
  );
  return result.affectedRows > 0;
};

const eliminar = async (id) => {
  const [result] = await pool.query(
    'DELETE FROM categorias WHERE id_categoria = ?',
    [id]
  );
  return result.affectedRows > 0;
};

module.exports = {
  obtenerTodas,
  obtenerPorId,
  crear,
  actualizar,
  eliminar,
};