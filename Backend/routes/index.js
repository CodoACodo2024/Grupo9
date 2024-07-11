const express = require('express');
const router = express.Router();
const usuarioRoutes = require('./usuarioRoutes');
const lavanderiaRoutes = require('./lavanderiaRoutes');
const reservaRoutes = require('./reservaRoutes');
const resenaRoutes = require('./resenaRoutes');

// Rutas principales
router.use(usuarioRoutes);
router.use(lavanderiaRoutes);
router.use(reservaRoutes);
router.use(resenaRoutes);

module.exports = router;
