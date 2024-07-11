import { Clientes } from "../../models/cliente.model.js";
import { Roles } from "../../models/roles.model.js";

const obtenerCliente = async (req, res) => {
  const { id } = req.params;
  try {
    const cliente = await Clientes.findOne({
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
    if (!cliente)
      return res.status(404).json({ mensaje: "El cliente no existe" });

    res.status(200).json({
      status: "success",
      cliente: cliente,
    });
  } catch (error) {
    res.status(500).json({
      mensaje: "Error al obtener el cliente",
      errorMessage: error.message,
      stack: error.stack,
      error,
    });
  }
};

export default obtenerCliente;
