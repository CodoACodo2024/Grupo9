const express = require('express');
const router = express.Router();
const lavanderiaController = require('../controllers/lavanderiacontroller');

// Rutas para lavanderias
router.get('/lavanderias', lavanderiaController.list);
router.post('/lavanderias', lavanderiaController.create);
router.get('/lavanderias/:id', lavanderiaController.getById);
router.put('/lavanderias/:id', lavanderiaController.update);
router.delete('/lavanderias/:id', lavanderiaController.delete);

module.exports = router;


