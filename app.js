const express = require('express');
const router = require('./src/rutas/rutas');
// Router de empleados; el nombre coincide con el archivo existente.
const empleadosRouter = require('./src/rutas/empleadosRutas');
const categoriaRutas = require('./src/rutas/categoriaRutas');
const clienteRutas = require('./src/rutas/clienteRutas');
const pedidoRutas = require('./src/rutas/pedidoRutas');
const productoRutas = require('./src/rutas/productoRutas');
const detallePedidoRutas = require('./src/rutas/detallePedidoRutas');

// La aplicacion se exporta para poder iniciarla desde index.js o probarla aparte.
const app = express();

// Convierte automaticamente los cuerpos JSON de las peticiones en req.body.
app.use(express.json());

// 1. Rutas específicas primero
app.use('/api/empleados', empleadosRouter);
app.use('/api/categorias', categoriaRutas);
app.use('/api/clientes', clienteRutas);
app.use('/api/pedidos', pedidoRutas);
app.use('/api/productos', productoRutas);
app.use('/api/detalle-pedido', detallePedidoRutas);

// 2. Router genérico al final para evitar capturas por rutas dinámicas como /:id
app.use('/api/', router);

module.exports = app;