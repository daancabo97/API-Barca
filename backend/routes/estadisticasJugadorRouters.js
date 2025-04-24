const express = require('express');
const router = express.Router();
const estadisticasController = require('../controllers/estadisticasJugadorController');

router.post('/crear', estadisticasController.crearEstadisticasJugador);
router.get('/obtener', estadisticasController.obtenerEstadisticasJugadores);
router.get('/obtener/:id', estadisticasController.obtenerEstadisticasJugadorPorId);
router.put('/actualizar/:id', estadisticasController.actualizarEstadisticasJugador);
router.delete('/eliminar/:id', estadisticasController.eliminarEstadisticasJugador);
router.delete('/eliminar', estadisticasController.eliminarEstadisticasJugadores);

module.exports = router;