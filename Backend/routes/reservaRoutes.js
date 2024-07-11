const express = require('express');
const router = express.Router();
const reservaController = require('../controllers/reservacontroller');

// Rutas para reservas
router.get('/reservas', reservaController.list);
router.post('/reservas', reservaController.create);
router.get('/reservas/:id', reservaController.getById);
router.put('/reservas/:id', reservaController.update);
router.delete('/reservas/:id', reservaController.delete);

module.exports = router;
