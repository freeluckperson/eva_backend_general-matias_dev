import { Usuarios } from "../models/usuario.model.js";
import { Roles } from "../models/roles.model.js";
import { Clientes } from "../models/cliente.model.js";

export const listaUsuariosRoles = async (id_rol) => {
  let modelo;
  if ((id_rol = 2)) {
    modelo = Clientes;
  } else {
    modelo = Usuarios;
  }

  return await modelo.findAll({
    where: {
      id_rol: id_rol,
      estado: true,
    },
    order: [["id_usuario", "DESC"]],
    include: {
      model: Roles,
      as: "rol",
    },
    attributes: {
      exclude: ["password"],
    },
  });
};
