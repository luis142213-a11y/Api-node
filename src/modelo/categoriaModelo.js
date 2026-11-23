const pool = require('../config/bd');

const obtenerTodas = async () => {
  const [rows] = await pool.query('SELECT id_categoria, nombre_categoria FROM categoria');
  return rows;
};

const obtenerPorId = async (id) => {
  const [rows] = await pool.query(
    'SELECT id_categoria, nombre_categoria FROM categoria WHERE id_categoria = ?',
    [id]
  );
  return rows[0] || null;
};

const crear = async ({ nombre_categoria }) => {
  const [result] = await pool.query(
    'INSERT INTO categoria (nombre_categoria) VALUES (?)',
    [nombre_categoria]
  );
  return { id_categoria: result.insertId, nombre_categoria };
};

const actualizar = async (id, { nombre_categoria }) => {
  const [result] = await pool.query(
    'UPDATE categoria SET nombre_categoria = ? WHERE id_categoria = ?',
    [nombre_categoria, id]
  );
  return result.affectedRows > 0;
};

const eliminar = async (id) => {
  const [result] = await pool.query(
    'DELETE FROM categoria WHERE id_categoria = ?',
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