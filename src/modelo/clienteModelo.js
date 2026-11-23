const pool = require("../config/bd");

const obtenerTodos = async () => {
  const [rows] = await pool.query("SELECT * FROM clientes");
  return rows;
};

const obtenerPorId = async (id) => {
  const [rows] = await pool.query(
    "SELECT * FROM clientes WHERE id_cliente = ?",
    [id]
  );
  return rows[0] || null;
};

const crear = async ({ nombre, correo, telefono = null, direccion = null }) => {
  const [result] = await pool.query(
    "INSERT INTO clientes (nombre, correo, telefono, direccion) VALUES (?, ?, ?, ?)",
    [nombre, correo, telefono, direccion]
  );
  return { id_cliente: result.insertId, nombre, correo, telefono, direccion };
};

const actualizar = async (id, { nombre, correo, telefono = null, direccion = null }) => {
  const [result] = await pool.query(
    "UPDATE clientes SET nombre = ?, correo = ?, telefono = ?, direccion = ? WHERE id_cliente = ?",
    [nombre, correo, telefono, direccion, id]
  );
  return result.affectedRows > 0;
};

const eliminar = async (id) => {
  const [result] = await pool.query(
    "DELETE FROM clientes WHERE id_cliente = ?",
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