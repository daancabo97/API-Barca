const Usuario = require("../models/usuario");
const { validationResult } = require("express-validator");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");


const loginUsuario = async (req, res) => {
  const { correo, contrasena } = req.body;

  try {
    const usuario = await Usuario.findOne({ correo });
    if (!usuario) {
      return res.status(400).json({ message: "Correo no registrado" });
    }

    const passwordValida = await bcrypt.compare(contrasena, usuario.contrasena);
    if (!passwordValida) {
      return res.status(401).json({ message: "Contraseña incorrecta" });
    }

    const token = jwt.sign(
      { id: usuario._id, rol: usuario.rol },
      "CLAVESECRETA",
      { expiresIn: "2h"}
    );

    res.json({
      token,
      usuario: {
        id: usuario._id,
        nombre: usuario.nombre,
        correo: usuario.correo,
        rol: usuario.rol,
      },
    });
  } catch (err) {
    res.status(500).json({ message: "Error en el servidor" });
  }
};
exports.loginUsuario = loginUsuario;



exports.crearUsuario = async (req, res) => {
  const errores = validationResult(req);
  if (!errores.isEmpty()) {
    return res.status(400).json({ errores: errores.array() });
  }

  try {
    const nuevoUsuario = new Usuario(req.body);
    await nuevoUsuario.save();
    res
      .status(201)
      .json({ message: "Usuario creado exitosamente", nuevoUsuario });
  } catch (error) {
    console.error(error);
    res
      .status(400)
      .json({ message: "Error al crear el usuario", error: error.message });
  }
};

exports.obtenerUsuarios = async (req, res) => {
  try {
    const usuarios = await Usuario.find();
    res.status(200).json(usuarios);
  } catch (error) {
    res.status(400).json({ message: "Error al obtener los usuarios", error });
  }
};

exports.obtenerUsuarioPorId = async (req, res) => {
  const { id } = req.params;

  try {
    const usuario = await Usuario.findById(id);
    if (!usuario) {
      return res.status(404).json({ message: "Usuario no encontrado" });
    }
    res.status(200).json(usuario);
  } catch (error) {
    res.status(400).json({ message: "Error al obtener el usuario", error });
  }
};

exports.actualizarUsuario = async (req, res) => {
  const { id } = req.params;
  const errores = validationResult(req);
  if (!errores.isEmpty()) {
    return res.status(400).json({ errores: errores.array() });
  }

  try {
    const usuarioActualizado = await Usuario.findByIdAndUpdate(id, req.body, {
      new: true,
    });
    if (!usuarioActualizado) {
      return res.status(404).json({ message: "Usuario no encontrado" });
    }
    res
      .status(200)
      .json({
        message: "Usuario actualizado exitosamente",
        usuarioActualizado,
      });
  } catch (error) {
    res.status(400).json({ message: "Error al actualizar el usuario", error });
  }
};

exports.eliminarUsuario = async (req, res) => {
  const { id } = req.params;

  try {
    const usuarioEliminado = await Usuario.findByIdAndDelete(id);
    if (!usuarioEliminado) {
      return res.status(404).json({ message: "Usuario no encontrado" });
    }
    res
      .status(200)
      .json({ message: "Usuario eliminado exitosamente", usuarioEliminado });
  } catch (error) {
    res.status(400).json({ message: "Error al eliminar el usuario", error });
  }
};

exports.actualizarRoles = async (req, res) => {
  const actualizaciones = req.body;

  if (!Array.isArray(actualizaciones)) {
    return res.status(400).json({ message: "Los IDs deben ser un arreglo" });
  }

  const rolesValidos = ["admin", "jugador", "tecnico"];
  const actualizacionesFiltradas = actualizaciones.filter((usuario) =>
    rolesValidos.includes(usuario.rol)
  );

  try {
    const usuariosActualizados = actualizacionesFiltradas.map((usuario) => ({
      updateOne: {
        filter: { _id: usuario._id },
        update: { rol: usuario.rol },
      },
    }));

    const resultado = await Usuario.bulkWrite(usuariosActualizados);

    res
      .status(200)
      .json({ message: "Roles actualizados exitosamente", resultado });
  } catch (error) {
    res.status(400).json({ message: "Error al actualizar los roles", error });
  }
};
