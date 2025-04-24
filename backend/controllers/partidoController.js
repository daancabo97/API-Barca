const Partido = require('../models/partido');
const { validationResult } = require('express-validator');

exports.crearPartido = async (req, res) => {
    const errores = validationResult(req);
    if (!errores.isEmpty()) {
        return res.status(400).json({ errores: errores.array() });
    }

    try {
        const nuevoPartido = new Partido(req.body);
        await nuevoPartido.save();

        const partidoCompleto = await Partido.findById(nuevoPartido._id)
            .populate('jugadoresConvocados.jugador', 'nombre correo')
            .populate('Tecnico', 'nombre correo');
        res.status(201).json({ message: 'Se ha creado con exito el partido!', nuevoPartido: partidoCompleto });
    } catch (error) {
        res.status(400).json({ message: 'Error al crear el partido', error });
    }
}

exports.obtenerPartidos = async (req, res) => {
    try {
        const partidos = await Partido.find()
            .populate('jugadoresConvocados.jugador', 'nombre correo')
            .populate('Tecnico', 'nombre correo');
        res.status(200).json(partidos);
    } catch (error) {
        res.status(400).json({ message: 'Error al obtener los partidos', error });
    }
}

exports.obtenerPartidoPorId = async (req, res) => {
    const { id } = req.params;

    try {
        const partidoEncontrado = await Partido.findById(id)
            .populate('jugadoresConvocados.jugador', 'nombre correo')
            .populate('Tecnico', 'nombre correo');
        if (!partidoEncontrado) {
            return res.status(404).json({ message: 'Partido no encontrado' });
        }
        res.status(200).json(partidoEncontrado);
    } catch (error) {
        res.status(400).json({ message: 'Error al obtener el partido', error });
    }
};

exports.actualizarPartido = async (req, res) => {
    const { id } = req.params;
    const errores = validationResult(req);
    if (!errores.isEmpty()) {
        return res.status(400).json({ errores: errores.array() });
    }

    try {
        const partidoActualizado = await Partido.findByIdAndUpdate(id, req.body, { new: true })
            .populate('jugadoresConvocados.jugador', 'nombre correo')
            .populate('Tecnico', 'nombre correo');
        if (!partidoActualizado) {
            return res.status(404).json({ message: 'Partido no encontrado' });
        }
        res.status(200).json({ message: 'Se ha actualizado con exito el partido!', partidoActualizado });
    } catch (error) {
        res.status(400).json({ message: 'Error al actualizar el partido', error });
    }
}

exports.eliminarPartido = async (req, res) => {
    const { id } = req.params;

    try {
        const partidoEliminado = await Partido.findByIdAndDelete(id);
        if (!partidoEliminado) {
            return res.status(404).json({ message: 'Partido no encontrado' });
        }
        res.status(200).json({ message: 'Se ha eliminado con exito el partido!', partidoEliminado });
    } catch (error) {
        res.status(400).json({ message: 'Error al eliminar el partido', error });
    }
}

exports.eliminarPartidos = async (req, res) => {
    try {
        const partidosEliminados = await Partido.deleteMany();
        res.status(200).json({ message: 'Se han eliminado todos los partidos!', partidosEliminados });
    } catch (error) {
        res.status(400).json({ message: 'Error al eliminar los partidos', error });
    }
}