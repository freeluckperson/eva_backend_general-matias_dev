// cspell: ignore razon, bycryptjs, passwordEncript
import { Op } from "sequelize";
import { Clientes } from "../../models/cliente.model.js";
import { listaUsuariosRoles } from "../../service/usuario.service.js";
import bycryptjs from "bcryptjs";

const registrarCLiente = async (req, res) => {
  const {
    nombre,
    apellido_materno,
    apellido_paterno,
    email,
    password,
    celular,
    dni,
    ruc,
    razon_social,
  } = req.body;

  if (
    !nombre ||
    !apellido_materno ||
    !apellido_paterno ||
    !dni ||
    !celular ||
    !password
  ) {
    return res.status(404).json({
      status: "error",
      message: "Su registro no ha sido satisfactorio, faltan datos",
    });
  }

  const id_rol = 2;
  try {
    const clienteExistente = await Clientes.findOne({
      where: {
        [Op.or]: [{ email }, { dni }],
      },
    });
    if (clienteExistente) {
      return res.status(400).json({
        status: "error",
        message: "Los datos ingresados ya fueron ingresados previamente",
      });
    }

    const passwordEncript = await bycryptjs.hash(password, 10);
    const nuevoCliente = await Clientes.create({
      nombre,
      apellido_materno,
      apellido_paterno,
      email,
      password: passwordEncript,
      celular,
      dni,
      ruc,
      razon_social,
      id_rol,
    });
    const rolesList = await listaUsuariosRoles(id_rol);
    res.status(201).json({
      status: "success",
      usuario: nuevoCliente,
      roles: rolesList,
      timestamp: new Date().toISOString(),
    });
  } catch (error) {
    res.status(500).json({
      mensaje: "Error al crear el usuario",
      errorMessage: error.message,
      stack: error.stack,
      error,
    });
  }
};

export default registrarCLiente;
