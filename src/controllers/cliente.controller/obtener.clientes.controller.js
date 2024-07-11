import { Clientes } from "../../models/cliente.model.js";
import { Roles } from "../../models/roles.model.js";

const clientesTotales = async (req, res) => {
  try {
    const clientes = await Clientes.findAll({
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
      cantidad: clientes.length,
      usuarios: clientes,
    });
  } catch (error) {
    res.status(500).json({
      mensaje: "Error al obtener los clientes",
      errorMessage: error.message,
      stack: error.stack,
      error,
    });
  }
};

export default clientesTotales;
