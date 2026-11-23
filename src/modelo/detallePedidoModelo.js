const pool = require('../config/bd');

const obtenerTodos = async () => {
  const [rows] = await pool.query(
    'SELECT id_detalle, id_pedido, id_producto, cantidad, precio_unitario FROM detalle_pedido'
  );
  return rows;
};

const obtenerPorId = async (id) => {
  const [rows] = await pool.query(
    'SELECT id_detalle, id_pedido, id_producto, cantidad, precio_unitario FROM detalle_pedido WHERE id_detalle = ?',
    [id]
  );
  return rows[0] || null;
};

// Detalle de un pedido: nombre de producto, cantidad y precio (INNER JOIN detalle_pedido + productos + pedidos)
const obtenerPorPedido = async (idPedido) => {
  const [rows] = await pool.query(
    `
    SELECT
      dp.id_detalle,
      dp.id_pedido,
      pe.fecha_pedido,
      pr.nombre AS nombre_producto,
      dp.cantidad,
      dp.precio_unitario AS precio,
      (dp.cantidad * dp.precio_unitario) AS subtotal
    FROM detalle_pedido dp
    INNER JOIN productos pr ON dp.id_producto = pr.id_producto
    INNER JOIN pedidos pe ON dp.id_pedido = pe.id_pedido
    WHERE dp.id_pedido = ?
    `,
    [idPedido]
  );
  return rows;
};

// Resumen agregado con INNER JOIN + GROUP BY (total vendido por producto)
const obtenerResumenVentasPorProducto = async () => {
  const [rows] = await pool.query(`
    SELECT
      pr.id_producto,
      pr.nombre AS nombre_producto,
      SUM(dp.cantidad) AS total_unidades_vendidas,
      SUM(dp.cantidad * dp.precio_unitario) AS total_vendido
    FROM detalle_pedido dp
    INNER JOIN productos pr ON dp.id_producto = pr.id_producto
    INNER JOIN pedidos pe ON dp.id_pedido = pe.id_pedido
    GROUP BY pr.id_producto, pr.nombre
    ORDER BY total_vendido DESC
  `);
  return rows;
};

const crear = async ({
  id_detalle = null,
  id_pedido,
  id_producto,
  cantidad,
  precio_unitario,
}) => {
  if (id_detalle !== null) {
    await pool.query(
      'INSERT INTO detalle_pedido (id_detalle, id_pedido, id_producto, cantidad, precio_unitario) VALUES (?, ?, ?, ?, ?)',
      [id_detalle, id_pedido, id_producto, cantidad, precio_unitario]
    );
    return { id_detalle, id_pedido, id_producto, cantidad, precio_unitario };
  }
  const [result] = await pool.query(
    'INSERT INTO detalle_pedido (id_pedido, id_producto, cantidad, precio_unitario) VALUES (?, ?, ?, ?)',
    [id_pedido, id_producto, cantidad, precio_unitario]
  );
  return {
    id_detalle: result.insertId,
    id_pedido,
    id_producto,
    cantidad,
    precio_unitario,
  };
};

const actualizar = async (id, { id_pedido, id_producto, cantidad, precio_unitario }) => {
  const [result] = await pool.query(
    'UPDATE detalle_pedido SET id_pedido = ?, id_producto = ?, cantidad = ?, precio_unitario = ? WHERE id_detalle = ?',
    [id_pedido, id_producto, cantidad, precio_unitario, id]
  );
  return result.affectedRows > 0;
};

const eliminar = async (id) => {
  const [result] = await pool.query(
    'DELETE FROM detalle_pedido WHERE id_detalle = ?',
    [id]
  );
  return result.affectedRows > 0;
};

module.exports = {
  obtenerTodos,
  obtenerPorId,
  obtenerPorPedido,
  obtenerResumenVentasPorProducto,
  crear,
  actualizar,
  eliminar,
};