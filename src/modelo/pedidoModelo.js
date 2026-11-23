const pool = require('../config/bd');

const obtenerTodos = async () => {
  const [rows] = await pool.query(
    'SELECT id_pedido, id_cliente, id_empleado, fecha_pedido, canal FROM pedidos'
  );
  return rows;
};

const obtenerPorId = async (id) => {
  const [rows] = await pool.query(
    'SELECT id_pedido, id_cliente, id_empleado, fecha_pedido, canal FROM pedidos WHERE id_pedido = ?',
    [id]
  );
  return rows[0] || null;
};

const obtenerConCliente = async () => {
  const [rows] = await pool.query(`
    SELECT
      p.id_pedido,
      p.fecha_pedido,
      p.canal,
      p.id_cliente,
      c.nombre AS nombre_cliente,
      c.ciudad
    FROM pedidos p
    INNER JOIN clientes c ON p.id_cliente = c.id_cliente
  `);
  return rows;
};

const crear = async ({
  id_pedido = null,
  id_cliente = null,
  id_empleado = null,
  fecha_pedido,
  canal,
}) => {
  if (id_pedido !== null) {
    await pool.query(
      'INSERT INTO pedidos (id_pedido, id_cliente, id_empleado, fecha_pedido, canal) VALUES (?, ?, ?, ?, ?)',
      [id_pedido, id_cliente, id_empleado, fecha_pedido, canal]
    );
    return { id_pedido, id_cliente, id_empleado, fecha_pedido, canal };
  }
  const [result] = await pool.query(
    'INSERT INTO pedidos (id_cliente, id_empleado, fecha_pedido, canal) VALUES (?, ?, ?, ?)',
    [id_cliente, id_empleado, fecha_pedido, canal]
  );
  return {
    id_pedido: result.insertId,
    id_cliente,
    id_empleado,
    fecha_pedido,
    canal,
  };
};

const actualizar = async (id, { id_cliente = null, id_empleado = null, fecha_pedido, canal }) => {
  const [result] = await pool.query(
    'UPDATE pedidos SET id_cliente = ?, id_empleado = ?, fecha_pedido = ?, canal = ? WHERE id_pedido = ?',
    [id_cliente, id_empleado, fecha_pedido, canal, id]
  );
  return result.affectedRows > 0;
};

const eliminar = async (id) => {
  const [result] = await pool.query(
    'DELETE FROM pedidos WHERE id_pedido = ?',
    [id]
  );
  return result.affectedRows > 0;
};

module.exports = {
  obtenerTodos,
  obtenerPorId,
  obtenerConCliente,
  crear,
  actualizar,
  eliminar,
};