const pool = require("../config/bd");

const obtenerTodos = async () => {
  const [rows] = await pool.query("SELECT * FROM productos");
  return rows;
};

const obtenerPorId = async (id) => {
  const [rows] = await pool.query(
    "SELECT * FROM productos WHERE id_producto = ?",
    [id]
  );
  return rows[0] || null;
};

const obtenerConCategoria = async () => {
  const [rows] = await pool.query(`
    SELECT
      pr.id_producto,
      pr.nombre,
      pr.precio,
      pr.stock,
      pr.id_categoria,
      ca.nombre AS nombre_categoria
    FROM productos pr
    INNER JOIN categorias ca ON pr.id_categoria = ca.id_categoria
  `);
  return rows;
};

const crear = async ({ nombre, precio, stock = 0, id_categoria }) => {
  const [result] = await pool.query(
    "INSERT INTO productos (nombre, precio, stock, id_categoria) VALUES (?, ?, ?, ?)",
    [nombre, precio, stock, id_categoria]
  );
  return { id_producto: result.insertId, nombre, precio, stock, id_categoria };
};

const actualizar = async (id, { nombre, precio, stock = 0, id_categoria }) => {
  const [result] = await pool.query(
    "UPDATE productos SET nombre = ?, precio = ?, stock = ?, id_categoria = ? WHERE id_producto = ?",
    [nombre, precio, stock, id_categoria, id]
  );
  return result.affectedRows > 0;
};

const eliminar = async (id) => {
  const [result] = await pool.query(
    "DELETE FROM productos WHERE id_producto = ?",
    [id]
  );
  return result.affectedRows > 0;
};

module.exports = {
  obtenerTodos,
  obtenerPorId,
  obtenerConCategoria,
  crear,
  actualizar,
  eliminar,
};