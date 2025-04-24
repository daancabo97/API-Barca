const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const usuarioSchema = new mongoose.Schema({
    nombre: {
        type: String,
        required: true,
    },
    correo: {
        type: String,
        required: true,
        unique: true,
    },
    contrasena: {
        type: String,
        required: true,
    },
    rol: {
        type: String,
        enum: ['admin', 'jugador', 'tecnico', 'usuario'],
        default: 'usuario'
    },
    posicion: {
        type: String,
        enum: ['Portero', 'Defensa', 'Centrocampista', 'Delantero'],
        required: function() {
            return this.rol === 'jugador';
        }
    }
});

usuarioSchema.pre('save', async function(next) {
    if (!this.isModified('contrasena')) return next();
    try {
        const salt = await bcrypt.genSalt(10);
        this.contrasena = await bcrypt.hash(this.contrasena, salt);
        next();
    } catch (error) {
        next(error);
    }
});

module.exports = mongoose.model('Usuario', usuarioSchema);