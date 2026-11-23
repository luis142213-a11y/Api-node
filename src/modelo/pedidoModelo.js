const pool = require("../config/bd");

const obtenerTodos = async () => {
  const [rows] = await pool.query("SELECT * FROM pedidos");
  return rows;
};

const obtenerPorId = async (id) => {
  const [rows] = await pool.query(
    "SELECT * FROM pedidos WHERE id_pedido = ?",
    [id]
  );
  return rows[0] || null;
};

const obtenerConCliente = async () => {
  const [rows] = await pool.query(`
    SELECT
      p.id_pedido,
      p.fecha_pedido,
      p.estado,
      p.total,
      p.id_cliente,
      c.nombre AS nombre_cliente
    FROM pedidos p
    INNER JOIN clientes c ON p.id_cliente = c.id_cliente
  `);
  return rows;
};

const crear = async ({ id_cliente, fecha_pedido = null, estado = "pendiente", total = 0 }) => {
  const fechaFinal = fecha_pedido || new Date();
  const [result] = await pool.query(
    "INSERT INTO pedidos (id_cliente, fecha_pedido, estado, total) VALUES (?, ?, ?, ?)",
    [id_cliente, fechaFinal, estado, total]
  );
  return {
    id_pedido: result.insertId,
    id_cliente,
    fecha_pedido: fechaFinal,
    estado,
    total,
  };
};

const actualizar = async (id, { id_cliente, fecha_pedido, estado, total }) => {
  const [result] = await pool.query(
    "UPDATE pedidos SET id_cliente = ?, fecha_pedido = ?, estado = ?, total = ? WHERE id_pedido = ?",
    [id_cliente, fecha_pedido, estado, total, id]
  );
  return result.affectedRows > 0;
};

const eliminar = async (id) => {
  const [result] = await pool.query(
    "DELETE FROM pedidos WHERE id_pedido = ?",
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