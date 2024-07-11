import { Clientes } from "../../models/cliente.model.js";
import { listaUsuariosRoles } from "../../service/usuario.service.js";

const eliminarCliente = async (req, res) => {
  const { id } = req.params;
  try {
    const clienteActual = await Clientes.findOne({
      where: { id_usuario: id },
      attributes: ["id_rol"], // Solo necesitas obtener el id_rol
    });

    if (!clienteActual) {
      return res.status(404).json({
        status: "error",
        message: "cliente no encontrado",
      });
    }
    await Clientes.update(
      {
        estado: false,
      },
      {
        where: {
          id_usuario: id,
        },
      }
    );
    const clienteRoles = await listaUsuariosRoles(clienteActual.id_rol);

    res.status(200).json({
      status: "success",
      message: "cliente eliminado con éxito",
    });
  } catch (error) {
    res.status(500).json({
      mensaje: "Error al eliminar el cliente",
      errorMessage: error.message,
      stack: error.stack,
      error,
    });
  }
};

export default eliminarCliente;
