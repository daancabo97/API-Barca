const express = require("express");
const router = express.Router();
const usuarioController = require("../controllers/usuarioController");

router.post("/crear", usuarioController.crearUsuario); 
router.get("/obtener", usuarioController.obtenerUsuarios);
router.get("/obtener/:id", usuarioController.obtenerUsuarioPorId);
router.put("/actualizar/:id", usuarioController.actualizarUsuario);
router.delete("/eliminar/:id", usuarioController.eliminarUsuario);
router.put("/actualizar-roles", usuarioController.actualizarRoles);
router.post('/login', usuarioController.loginUsuario);

module.exports = router;