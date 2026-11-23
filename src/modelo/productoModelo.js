const pool = require('../config/bd');

const obtenerTodos = async () => {
  const [rows] = await pool.query(
    'SELECT id_producto, nombre, id_categoria, precio, costo, stock FROM productos'
  );
  return rows;
};

const obtenerPorId = async (id) => {
  const [rows] = await pool.query(
    'SELECT id_producto, nombre, id_categoria, precio, costo, stock FROM productos WHERE id_producto = ?',
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
      pr.costo,
      pr.stock,
      pr.id_categoria,
      ca.nombre AS nombre_categoria
    FROM productos pr
    INNER JOIN categorias ca ON pr.id_categoria = ca.id_categoria
  `);
  return rows;
};

const crear = async ({
  id_producto = null,
  nombre,
  id_categoria = null,
  precio,
  costo,
  stock,
}) => {
  if (id_producto !== null) {
    await pool.query(
      'INSERT INTO productos (id_producto, nombre, id_categoria, precio, costo, stock) VALUES (?, ?, ?, ?, ?, ?)',
      [id_producto, nombre, id_categoria, precio, costo, stock]
    );
    return { id_producto, nombre, id_categoria, precio, costo, stock };
  }
  const [result] = await pool.query(
    'INSERT INTO productos (nombre, id_categoria, precio, costo, stock) VALUES (?, ?, ?, ?, ?)',
    [nombre, id_categoria, precio, costo, stock]
  );
  return {
    id_producto: result.insertId,
    nombre,
    id_categoria,
    precio,
    costo,
    stock,
  };
};

const actualizar = async (id, { nombre, id_categoria = null, precio, costo, stock }) => {
  const [result] = await pool.query(
    'UPDATE productos SET nombre = ?, id_categoria = ?, precio = ?, costo = ?, stock = ? WHERE id_producto = ?',
    [nombre, id_categoria, precio, costo, stock, id]
  );
  return result.affectedRows > 0;
};

const eliminar = async (id) => {
  const [result] = await pool.query(
    'DELETE FROM productos WHERE id_producto = ?',
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