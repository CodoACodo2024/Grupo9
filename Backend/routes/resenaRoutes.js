const express = require('express');
const router = express.Router();
const resenaController = require('../controllers/resenacontroller');

// Rutas para reseñas
router.get('/resenas', resenaController.list);
router.post('/resenas', resenaController.create);
router.get('/resenas/:id', resenaController.getById);
router.put('/resenas/:id', resenaController.update);
router.delete('/resenas/:id', resenaController.delete);

module.exports = router;
