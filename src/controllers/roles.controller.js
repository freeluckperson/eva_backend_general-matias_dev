// cspell: ignore descripcion
import { Roles } from "../models/roles.model.js";
import { obtenerRolesActivos } from "../service/roles.service.js";

export const crearRol = async (req, res) => {
  const { nombre, descripcion } = req.body;
  try {
    await Roles.create({
      nombre,
      descripcion,
    });
    const roles = await obtenerRolesActivos();
    res.status(201).json({
      status: "success",
      roles: roles,
    });
  } catch (error) {
    res.status(500).json({
      mensaje: "Error al crear el rol",
      errorMessage: error.message,
      stack: error.stack,
      error,
    });
  }
};

export const listarRoles = async (req, res) => {
  try {
    const roles = await obtenerRolesActivos();
    res.status(200).json({
      status: "success",
      cantidad: roles.length,
      roles: roles,
    });
  } catch (error) {
    res.status(500).json({
      mensaje: "Error al listar los roles",
      errorMessage: error.message,
      stack: error.stack,
      error,
    });
  }
};

export const obtenerRol = async (req, res) => {
  const { id } = req.params;
  try {
    const rol = await Roles.findOne({
      where: {
        id_rol: id,
        estado: true,
      },
    });

    res.status(200).json({
      status: "success",
      rol: rol,
    });
  } catch (error) {
    res.status(500).json({
      mensaje: "Error al obtener el rol",
      errorMessage: error.message,
      stack: error.stack,
      error,
    });
  }
};

export const actualizarRol = async (req, res) => {
  const { id } = req.params;
  const { nombre, descripcion } = req.body;
  try {
    await Roles.update(
      {
        nombre,
        descripcion,
      },
      {
        where: {
          id_rol: id,
        },
      }
    );
    res.status(200).json(await obtenerRolesActivos());
  } catch (error) {
    res.status(500).json({
      mensaje: "Error al actualizar el rol",
      errorMessage: error.message,
      stack: error.stack,
      error,
    });
  }
};

export const eliminarRol = async (req, res) => {
  const { id } = req.params;
  try {
    await Roles.update(
      {
        estado: false,
      },
      {
        where: {
          id_rol: id,
        },
      }
    );
    res.status(200).json(await obtenerRolesActivos());
  } catch (error) {
    res.status(500).json({
      mensaje: "Error al eliminar el rol",
      errorMessage: error.message,
      stack: error.stack,
      error,
    });
  }
};
