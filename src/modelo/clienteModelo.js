const pool = require('../config/bd');

const obtenerTodos = async () => {
  const [rows] = await pool.query(
    'SELECT id_cliente, nombre, ciudad, fecha_registro FROM clientes'
  );
  return rows;
};

const obtenerPorId = async (id) => {
  const [rows] = await pool.query(
    'SELECT id_cliente, nombre, ciudad, fecha_registro FROM clientes WHERE id_cliente = ?',
    [id]
  );
  return rows[0] || null;
};

const crear = async ({ id_cliente = null, nombre, ciudad, fecha_registro }) => {
  if (id_cliente !== null) {
    await pool.query(
      'INSERT INTO clientes (id_cliente, nombre, ciudad, fecha_registro) VALUES (?, ?, ?, ?)',
      [id_cliente, nombre, ciudad, fecha_registro]
    );
    return { id_cliente, nombre, ciudad, fecha_registro };
  }
  const [result] = await pool.query(
    'INSERT INTO clientes (nombre, ciudad, fecha_registro) VALUES (?, ?, ?)',
    [nombre, ciudad, fecha_registro]
  );
  return { id_cliente: result.insertId, nombre, ciudad, fecha_registro };
};

const actualizar = async (id, { nombre, ciudad, fecha_registro }) => {
  const [result] = await pool.query(
    'UPDATE clientes SET nombre = ?, ciudad = ?, fecha_registro = ? WHERE id_cliente = ?',
    [nombre, ciudad, fecha_registro, id]
  );
  return result.affectedRows > 0;
};

const eliminar = async (id) => {
  const [result] = await pool.query(
    'DELETE FROM clientes WHERE id_cliente = ?',
    [id]
  );
  return result.affectedRows > 0;
};

module.exports = {
  obtenerTodos,
  obtenerPorId,
  crear,
  actualizar,
  eliminar,
};