const pool = require("../config/bd");

const obtenerTodas = async () => {
  const [rows] = await pool.query("SELECT * FROM categorias");
  return rows;
};

const obtenerPorId = async (id) => {
  const [rows] = await pool.query(
    "SELECT * FROM categorias WHERE id_categoria = ?",
    [id]
  );
  return rows[0] || null;
};

const crear = async ({ nombre, descripcion = null }) => {
  const [result] = await pool.query(
    "INSERT INTO categorias (nombre, descripcion) VALUES (?, ?)",
    [nombre, descripcion]
  );
  return { id_categoria: result.insertId, nombre, descripcion };
};

const actualizar = async (id, { nombre, descripcion = null }) => {
  const [result] = await pool.query(
    "UPDATE categorias SET nombre = ?, descripcion = ? WHERE id_categoria = ?",
    [nombre, descripcion, id]
  );
  return result.affectedRows > 0;
};

const eliminar = async (id) => {
  const [result] = await pool.query(
    "DELETE FROM categorias WHERE id_categoria = ?",
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