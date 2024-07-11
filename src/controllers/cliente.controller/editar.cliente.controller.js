import { Clientes } from "../../models/cliente.model.js";
import { listaUsuariosRoles } from "../../service/usuario.service.js";

const editarCliente = async (req, res) => {
  const { id } = req.params;
  const {
    nombre,
    apellido_materno,
    apellido_paterno,
    dni,
    celular,
    email,
    password,
    ruc,
    razon_social,
  } = req.body;

  try {
    const clienteActual = await Clientes.findOne({
      where: { id_usuario: id },
      attributes: ["id_rol"], // Solo necesitas obtener el id_rol
    });

    // Si el cliente no existe, puedes enviar un error o continuar según tu lógica de negocio
    if (!clienteActual) {
      return res.status(404).json({
        status: "error",
        mensaje: "cliente no encontrado",
      });
    }

    const cliente_cambiado = await Clientes.update(
      {
        nombre,
        apellido_materno,
        apellido_paterno,
        dni,
        celular,
        email,
        password,
        ruc,
        razon_social,
      },
      {
        where: {
          id_usuario: id,
        },
      }
    );

    const clienteActualizado = await Clientes.findOne({
      where: {
        id_usuario: req.params.id,
      },
      attributes: { exclude: ["password"] },
    });

    const clientesRoles = await listaUsuariosRoles(clienteActual.id_rol);

    res.status(200).json({
      status: "success",
      cliente_actualizado: clienteActualizado,
      clientesRoles: clientesRoles,
    });
  } catch (error) {
    res.status(500).json({
      mensaje: "Error al actualizar el cliente",
      errorMessage: error.message,
      stack: error.stack,
      error,
    });
  }
};

export default editarCliente;
