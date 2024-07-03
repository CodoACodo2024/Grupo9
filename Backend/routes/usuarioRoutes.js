const express = require('express');
const router = express.Router();
const usuarioController = require('../controllers/usuarioController');

// Rutas para usuarios
router.get('/usuarios', usuarioController.list);
router.post('/usuarios', usuarioController.create);
router.get('/usuarios/:id', usuarioController.getById);
router.put('/usuarios/:id', usuarioController.update);
router.delete('/usuarios/:id', usuarioController.delete);

module.exports = router;


