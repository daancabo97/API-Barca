const express = require('express');
const router = express.Router();
const partidoController = require('../controllers/partidoController');

router.post('/crear', partidoController.crearPartido); 
router.get('/obtener', partidoController.obtenerPartidos);
router.get('/obtener/:id', partidoController.obtenerPartidoPorId);
router.put('/actualizar/:id', partidoController.actualizarPartido);
router.delete('/eliminar/:id', partidoController.eliminarPartido);
router.delete('/eliminar', partidoController.eliminarPartidos);

module.exports = router;