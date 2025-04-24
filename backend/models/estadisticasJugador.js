const mongoose = require('mongoose');

const estadisticasJugadorSchema = new mongoose.Schema({
    jugador: { type: mongoose.Schema.Types.ObjectId, ref: 'Usuario' },
    partido: { type: mongoose.Schema.Types.ObjectId, ref: 'Partido' },
    goles: Number,
    asistencias: Number,
    tarjetasAmarillas: Number,
    tarjetasRojas: Number,
    minutosJugados: Number,
    posicion: String
});

module.exports = mongoose.model('EstadisticasJugador', estadisticasJugadorSchema);