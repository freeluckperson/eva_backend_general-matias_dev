//cspell: ignore bycryptjs,anio_experiencia,motivacion, cambioCalificacion,Logueado, calificacion, realizar_evaluacion, Encript, unico, cloudinary

import bcrypt from "bcryptjs";

// import cloudinary from "../config/cloudinary.config.js";
import fs from "fs";
import util from "util";

const unlinkFile = util.promisify(fs.unlink);

import { Usuarios } from "../models/usuario.model.js";
import { Roles } from "../models/roles.model.js";
import { listaUsuariosRoles } from "../service/usuario.service.js";
import { Op } from "sequelize";
import { generarJWT } from "../utils/token.js";
import { uploadImage } from "../utils/cloudinary.js";

// export const crearUsuarioPostulante = async (req, res) => {
//   const {
//     nombre,
//     apellido_materno,
//     apellido_paterno,
//     dni,
//     colegiada,
//     anio_experiencia,
//     motivacion,
//   } = req.body;

//   const id_rol = 4; // El id del rol de postulante
//   try {
//     const nuevoUsuario = await Usuarios.create({
//       dni,
//       nombre,
//       apellido_paterno,
//       apellido_materno,
//       colegiada,
//       anio_experiencia,
//       motivacion,
//       archivo_cv: "",
//       certificado_unico_laboral: "",
//       celular: "",
//       email: "",
//       password: "",
//       id_rol,
//     });
//     const rolesList = await listaUsuariosRoles(id_rol);

//     res.status(201).json({
//       status: "success",
//       usuario: nuevoUsuario,
//       roles: rolesList,
//       timestamp: new Date().toISOString(),
//     });
//   } catch (error) {
//     res.status(500).json({
//       mensaje: "Error al crear el usuario",
//       errorMessage: error.message,
//       stack: error.stack,
//       error,
//     });
//   }
// };

// export const crearUsuarioPostulante = async (req, res) => {
//   const {
//     nombre,
//     apellido_materno,
//     apellido_paterno,
//     dni,
//     colegiada,
//     anio_experiencia,
//     motivacion,
//     email,
//     password,
//   } = req.body;

//   const id_rol = 1; // El id del rol de postulante
//   try {
//     // Verifica si el id_rol existe en la tabla "roles" antes de crear el usuario
//     const rolExistente = await Roles.findByPk(id_rol);
//     if (!rolExistente) {
//       return res.status(400).json({ mensaje: "El rol especificado no existe" });
//     }

//     // Encriptar la contraseña antes de guardarla en la base de datos
//     const hashedPassword = await bycrypt.hash(password, 10);

//     const nuevoUsuario = await Usuarios.create({
//       dni,
//       nombre,
//       apellido_paterno,
//       apellido_materno,
//       colegiada,
//       anio_experiencia,
//       motivacion,
//       archivo_cv: "",
//       certificado_unico_laboral: "",
//       celular: "",
//       email,
//       password: hashedPassword,
//       id_rol,
//     });
//     const rolesList = await listaUsuariosRoles(id_rol);

//     res.status(201).json({
//       status: "success",
//       usuario: nuevoUsuario,
//       roles: rolesList,
//       timestamp: new Date().toISOString(),
//     });
//   } catch (error) {
//     res.status(500).json({
//       mensaje: "Error al crear el usuario",
//       errorMessage: error.message,
//       stack: error.stack,
//       error,
//     });
//   }
// };

export const crearUsuarioPostulante = async (req, res) => {
  const {
    nombre,
    apellido_materno,
    apellido_paterno,
    dni,
    colegiada,
    anio_experiencia,
    motivacion,
    email,
    password,
    celular,
  } = req.body;

  const id_rol = 1; // El id del rol de postulante
  try {
    // Verifica si el id_rol existe en la tabla "roles" antes de crear el usuario
    const rolExistente = await Roles.findByPk(id_rol);
    if (!rolExistente) {
      return res.status(400).json({ mensaje: "El rol especificado no existe" });
    }

    // Encriptar la contraseña antes de guardarla en la base de datos
    const hashedPassword = await bcrypt.hash(password, 10); // Utiliza bcrypt en lugar de bycryptjs

    let secure_url;
    if (req.files?.image) {
      const result = await uploadImage(req.files.image.tempFilePath);
      secure_url = result.secure_url;
    }

    const nuevoUsuario = await Usuarios.create({
      dni,
      nombre,
      apellido_paterno,
      apellido_materno,
      colegiada,
      anio_experiencia,
      motivacion,
      archivo_cv: secure_url,
      certificado_unico_laboral: "",
      email,
      password: hashedPassword,
      celular,
      id_rol,
    });

    const rolesList = await listaUsuariosRoles(id_rol);

    res.status(201).json({
      status: "success",
      usuario: nuevoUsuario,
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

export const listaUsuariosRolesActivo = async (req, res) => {
  const { id_rol } = req.params;
  try {
    const usuariosRoles = await listaUsuariosRoles(id_rol);
    res.status(200).json({
      status: "success",
      cantidad: usuariosRoles.length,
      listaUsuariosRoles: usuariosRoles,
    });
  } catch (error) {
    res.status(500).json({
      mensaje: "Error al listar los usuarios",
      errorMessage: error.message,
      stack: error.stack,
      error,
    });
  }
};

export const obtenerUsuario = async (req, res) => {
  const { id } = req.params;
  try {
    const usuario = await Usuarios.findOne({
      where: {
        id_usuario: id,
        estado: true,
      },
      include: {
        model: Roles,
        as: "rol",
      },
      attributes: {
        exclude: ["password"],
      },
    });
    if (!usuario)
      return res.status(404).json({ mensaje: "El usuario no existe" });

    res.status(200).json({
      status: "success",
      usuario: usuario,
    });
  } catch (error) {
    res.status(500).json({
      mensaje: "Error al obtener el usuario",
      errorMessage: error.message,
      stack: error.stack,
      error,
    });
  }
};

export const actualizarUsuario = async (req, res) => {
  const { id } = req.params;
  const {
    nombre,
    apellido_materno,
    apellido_paterno,
    dni,
    colegiada,
    anio_experiencia,
    motivacion,
    archivo_cv,
    celular,
    email,
  } = req.body;
  try {
    const usuarioActual = await Usuarios.findOne({
      where: { id_usuario: id },
      attributes: ["id_rol"], // Solo necesitas obtener el id_rol
    });

    // Si el usuario no existe, puedes enviar un error o continuar según tu lógica de negocio
    if (!usuarioActual) {
      return res.status(404).json({ mensaje: "Usuario no encontrado" });
    }

    const usuario_cambiado = await Usuarios.update(
      {
        nombre,
        apellido_materno,
        apellido_paterno,
        dni,
        colegiada,
        anio_experiencia,
        motivacion,
        archivo_cv,
        celular,
        email,
      },
      {
        where: {
          id_usuario: id,
        },
      }
    );

    const usuariosRoles = await listaUsuariosRoles(usuarioActual.id_rol);

    res.status(200).json({
      status: "success",
      usuario_cambiado: usuario_cambiado,
      usuariosRoles: usuariosRoles,
    });
  } catch (error) {
    res.status(500).json({
      mensaje: "Error al actualizar el usuario",
      errorMessage: error.message,
      stack: error.stack,
      error,
    });
  }
};

export const eliminarUsuario = async (req, res) => {
  const { id, id_rol } = req.params;
  try {
    const usuarioActual = await Usuarios.findOne({
      where: { id_usuario: id },
      attributes: ["id_rol"], // Solo necesitas obtener el id_rol
    });

    // Si el usuario no existe, puedes enviar un error o continuar según tu lógica de negocio
    if (!usuarioActual) {
      return res.status(404).json({ mensaje: "Usuario no encontrado" });
    }
    await Usuarios.update(
      {
        estado: false,
      },
      {
        where: {
          id_usuario: id,
        },
      }
    );
    const usuarioRoles = await listaUsuariosRoles(usuarioActual.id_rol);

    res.status(200).json({
      status: "success",
      message: "Usuario eliminado con éxito",
      usuarioRoles: usuarioRoles,
    });
  } catch (error) {
    res.status(500).json({
      mensaje: "Error al eliminar el usuario",
      errorMessage: error.message,
      stack: error.stack,
      error,
    });
  }
};

export const obtenerUsuariosTotales = async (req, res) => {
  try {
    const usuarios = await Usuarios.findAll({
      order: [["id_usuario", "DESC"]],
      include: {
        model: Roles,
        as: "rol",
      },
      attributes: {
        exclude: ["password"],
      },
    });
    res.status(200).json({
      status: "success",
      cantidad: usuarios.length,
      usuarios: usuarios,
    });
  } catch (error) {
    res.status(500).json({
      mensaje: "Error al obtener los usuarios",
      errorMessage: error.message,
      stack: error.stack,
      error,
    });
  }
};

export const cambiarRolUsuarioPostulateAContadora = async (req, res) => {
  const { id } = req.params;
  const id_rol = 3; // El id del rol de contadora
  try {
    await Usuarios.update(
      {
        id_rol,
      },
      {
        where: {
          id_usuario: id,
        },
      }
    );
    res.status(200).json(await listaUsuariosRoles(4));
  } catch (error) {
    res.status(500).json({
      mensaje: "Error al cambiar el rol del usuario",
      errorMessage: error.message,
      stack: error.stack,
      error,
    });
  }
};

export const crearUsuarioCompleto = async (req, res) => {
  const {
    nombre,
    apellido_materno,
    apellido_paterno,
    dni,
    colegiada,
    anio_experiencia,
    motivacion,
    archivo_cv,
    celular,
    email,
    password,
    id_rol,
  } = req.body;
  try {
    if (password === undefined || password === "" || password === null) {
      return res.status(400).json({
        mensaje: "La contraseña es requerida",
      });
    }

    if (
      id_rol === undefined ||
      id_rol === "" ||
      id_rol === null ||
      id_rol == 4
    ) {
      return res.status(400).json({
        mensaje: "El rol es requerido o no tiene el rol correcto",
      });
    }

    const existeUsuario = await Usuarios.findOne({
      where: {
        email,
        estado: true,
      },
    });

    if (existeUsuario) {
      return res.status(400).json({
        mensaje: "El usuario ya existe",
      });
    }

    const passwordEncript = await bycryptjs.hash(password, 10);

    const nuevoUsuario = await Usuarios.create({
      nombre,
      apellido_materno,
      apellido_paterno,
      dni,
      colegiada,
      anio_experiencia,
      motivacion,
      archivo_cv,
      celular,
      email,
      password: passwordEncript,
      id_rol,
    });
    delete nuevoUsuario.dataValues.password;

    res.status(201).json({
      status: "success",
      usuario: nuevoUsuario,
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

export const loginUsuario = async (req, res) => {
  const { email, password } = req.body;
  try {
    const usuario = await Usuarios.findOne({
      where: {
        email,
        estado: true,
        //id rol diferente de 4
        id_rol: {
          [Op.ne]: 4,
        },
      },
    });

    if (!usuario) {
      return res.status(400).json({
        status: "error",
        message: "El usuario no existe",
      });
    }

    const validarPassword = await bycryptjs.compare(password, usuario.password);

    if (!validarPassword) {
      return res.status(400).json({
        status: "error",
        message: "Ingreso invalido",
      });
    }
    delete usuario.dataValues.password;

    const { token, refreshToken } = await generarJWT(
      usuario.id_usuario,
      usuario.email,
      usuario.id_rol
    );
    console.log("usuarioLogin", usuario);
    res.status(200).json({
      status: "success",
      message: "Logueado con éxito",
      usuario: usuario,
      token: token,
      refreshToken: refreshToken,
    });
  } catch (error) {
    res.status(500).json({
      mensaje: "Error al hacer el login",
      errorMessage: error.message,
      stack: error.stack,
      error,
    });
  }
};

export const getDNIContadora = async (req, res) => {
  const { dni } = req.params;
  try {
    const usuario = await Usuarios.findOne({
      where: {
        dni,
        estado: true,
      },
    });

    if (!usuario) {
      return res.status(400).json({
        status: "error",
        mensaje: "El usuario no existe",
      });
    } else if (usuario.calificacion == null) {
      return res.status(200).json({
        status: "realizar_evaluacion",
        message: "la postulante aun no tiene calificación",
        calificacion: usuario.calificacion,
        usuario: usuario,
      });
    } else if (usuario.calificacion < 14) {
      return res.status(200).json({
        status: "error",
        message: "la postulante tiene calificación menor a 14",
        calificacion: usuario.calificacion,
        usuario: usuario,
      });
    } else if (usuario.calificacion >= 14) {
      return res.status(200).json({
        status: "success",
        calificacion: usuario.calificacion,
        linkCalendly: "https://calendly.com/mati69lbt",
        usuario: usuario,
      });
    }
  } catch (error) {
    res.status(500).json({
      mensaje: "Error al obtener el usuario",
      errorMessage: error.message,
      stack: error.stack,
      error,
    });
  }
};

export const cambioCalificacion = async (req, res) => {
  const { id } = req.params;
  const { calificacion } = req.body;

  try {
    const usuario = await Usuarios.findByPk(id);

    if (!usuario) {
      return res.status(404).json({
        message: "Usuario no encontrado",
      });
    }

    const nuevaCalificacion = parseFloat(calificacion);
    if (isNaN(nuevaCalificacion)) {
      return res.status(400).json({
        message: "Calificación inválida. Debe ser un número.",
      });
    }

    usuario.calificacion = calificacion;
    const postulanteActualizado = await usuario.save();

    res.status(200).json({
      status: "success",
      usuario: postulanteActualizado,
    });
  } catch (error) {
    res.status(500).json({
      message: "Error al cambiar calificacion del usuario",
      errorMessage: error.message,
      stack: error.stack,
      error,
    });
  }
};

export const cargarDocumentos = async (req, res) => {
  const { id } = req.params;

  const { curriculum, cul } = req.files;

  if (!curriculum || !cul) {
    return res.status(400).json({
      status: "error",
      message: "Debe subir ambos documentos: currículum y CUL",
    });
  }

  if (
    curriculum[0].mimetype !== "application/pdf" ||
    cul[0].mimetype !== "application/pdf"
  ) {
    return res.status(400).json({
      status: "error",
      message: "Ambos archivos deben ser PDF",
    });
  }

  try {
    const postulante = await Usuarios.findByPk(id, {
      attributes: {
        exclude: ["password"],
      },
    });

    if (!postulante) {
      return res.status(404).json({
        status: "error",
        message: "postulante no encontrado",
      });
    }

    const folderName = "Eva";
    const nombreCompleto =
      `${postulante.nombre}_${postulante.apellido_paterno}_${postulante.apellido_materno}`.replace(
        / /g,
        "_"
      );

    const resultCV = await cloudinary.uploader.upload(curriculum[0].path, {
      folder: folderName,
      public_id: `cv_${nombreCompleto}`,
    });
    const resultCUL = await cloudinary.uploader.upload(cul[0].path, {
      folder: folderName,
      public_id: `cul_${nombreCompleto}`,
    });

    postulante.archivo_cv = resultCV.secure_url;
    postulante.certificado_unico_laboral = resultCUL.secure_url;

    const carga_de_Documentos = await postulante.save();

    const delete_cv = await unlinkFile(curriculum[0].path);
    const delete_cul = await unlinkFile(cul[0].path);

    res.status(200).json({
      status: "success",
      message: "Documentos subidos correctamente",
      postulante: postulante,
    });
  } catch (error) {
    return res.status(404).json({
      status: "Error",
      message: "Hubo problemas para subir documentación",
      message: error.message,
    });
  }
};

export const obtenerDocumentos = async (req, res) => {};

// export const obtenerDocumentos = async (req, res) => {
//   const { id } = req.params;
//   try {
//     const postulante = await Usuarios.findByPk(id, {
//       attributes: ["archivo_cv", "certificado_unico_laboral"],
//     });

//     if (!postulante) {
//       return res.status(404).json({
//         status: "error",
//         message: "Postulante no encontrado",
//       });
//     }

//     if (!postulante.archivo_cv && !postulante.certificado_unico_laboral) {
//       return res.status(404).json({
//         status: "error",
//         message: "No hay documentos cargados para este postulante",
//       });
//     }

//     res.status(200).json({
//       status: "success",
//       data: {
//         archivo_cv: postulante.archivo_cv,
//         certificado_unico_laboral: postulante.certificado_unico_laboral,
//       },
//     });
//   } catch (error) {
//     return res.status(500).json({
//       status: "error",
//       message: "Hubo un problema al obtener los documentos",
//       error: error.message,
//     });
//   }
// };
