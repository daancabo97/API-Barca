const EstadisticasJugador = require('../models/estadisticasJugador');
const { validationResult } = require('express-validator');

exports.crearEstadisticasJugador = async (req, res) => {
    const errores = validationResult(req);
    if (!errores.isEmpty()) {
        return res.status(400).json({ errores: errores.array() });
    }

    try {
        const nuevaEstadistica = new EstadisticasJugador(req.body);
        await nuevaEstadistica.save();

        const estadisticaCompleta = await EstadisticasJugador.findById(nuevaEstadistica._id)
            .populate('jugador', 'nombre correo')
            .populate('partido', 'equipoRival fecha');

        res.status(201).json({ message: 'Se han creado con exito las estadisticas del jugador!', estadistica: estadisticaCompleta, nuevaEstadistica });
    } catch (error) {
        res.status(400).json({ message: 'Error al crear las estadísticas del jugador', error });
    }
}

exports.obtenerEstadisticasJugadores = async (req, res) => {
    try {
        const estadisticasJugadores = await EstadisticasJugador.find()
            .populate('jugador', 'nombre correo rol posicion')
            .populate('partido', 'equipoRival Fecha');
        res.status(200).json(estadisticasJugadores);
    } catch (error) {
        console.error(error);
        res.status(400).json({ message: 'Error al obtener las estadísticas de los jugadores', error });
    }
}

exports.obtenerEstadisticasJugadorPorId = async (req, res) => {
    const { id } = req.params;

    try {
        const estadisticasJugador = await EstadisticasJugador.findOne({jugador: id})
            .populate('jugador', 'nombre correo rol posicion')
            .populate('partido', 'equipoRival Fecha');
        if (!estadisticasJugador) {
            return res.status(404).json({ message: 'No se encuentraron estadisticas para este jugador' });
        }
        res.status(200).json(estadisticasJugador);
    } catch (error) {
        res.status(400).json({ message: 'Error al obtener las estadísticas del jugador', error });
    }
};

exports.actualizarEstadisticasJugador = async (req, res) => {
    const { id } = req.params;
    const errores = validationResult(req);
    if (!errores.isEmpty()) {
        return res.status(400).json({ errores: errores.array() });
    }

    try {
        const estadisticaActualizadaJugador = await EstadisticasJugador.findByIdAndUpdate(id, req.body, { new: true })
        .populate('jugador', 'nombre correo rol posicion')
        .populate('partido', 'equipoRival Fecha');

        if(!estadisticaActualizadaJugador) {
            return res.status(404).json({ message: 'No se encontraron estadisticas para este jugador' });
        }

        res.status(200).json({ message: 'Se han actualizado con exito las estadisticas del jugador!', estadisticaActualizadaJugador });
    } catch (error) {
        res.status(400).json({ message: 'Error al actualizar las estadísticas del jugador', error });
    }
}

exports.eliminarEstadisticasJugador = async (req, res) => {
    const { id } = req.params;

    try {
        const estadisticaEliminadaJugador = await EstadisticasJugador.findByIdAndDelete(id);
        if (!estadisticaEliminadaJugador) {
            return res.status(404).json({ message: 'No se encontraron Estadisticas del Jugador' });
        }
        res.status(200).json({ message: 'Se han eliminado con exito las estadisticas del jugador!', estadisticaEliminadaJugador });
    } catch (error) {
        res.status(400).json({ message: 'Error al eliminar las estadisticas del jugador', error });
    }
}

exports.eliminarEstadisticasJugadores = async (req, res) => {
    try {
        const estadisticasEliminadasJugadores = await EstadisticasJugador.deleteMany();
        res.status(200).json({ message: 'Se han eliminado con exito las estadisticas de los jugadores!', estadisticasEliminadasJugadores });
    } catch (error) {
        res.status(400).json({ message: 'Error al eliminar las estadísticas de los jugadores', error });
    }
}
