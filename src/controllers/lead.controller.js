import { Lead } from "../models/lead.model.js";
import { listLeads } from "../service/lead.service.js";

export const crearLead = async (req, res) => {
  const { nombre, mensaje, email, celular } = req.body;
  try {
    const nuevoLead = await Lead.create({
      nombre,
      mensaje,
      email,
      celular,
    });
    res.status(201).json({
      status: "success",
      nuevoLead: nuevoLead,
    });
  } catch (error) {
    res.status(500).json({
      mensaje: "Error al crear el lead",
      errorMessage: error.message,
      stack: error.stack,
      error,
    });
  }
};

export const listarLeads = async (req, res) => {
  try {
    const listarLeads = await listLeads();
    res.status(200).json({
      status: "success",
      cantidad: listarLeads.length,
      listarLeads: listarLeads,
    });
  } catch (error) {
    res.status(500).json({
      mensaje: "Error al listar los leads",
      errorMessage: error.message,
      stack: error.stack,
      error,
    });
  }
};

export const obtenerLead = async (req, res) => {
  const { id } = req.params;
  try {
    const lead = await Lead.findOne({
      where: {
        id_lead: id,
        estado: true,
      },
    });
    if (!lead)
      return res.status(404).json({
        status: "error",
        mensaje: "El lead no existe",
      });

    res.status(200).json({
      status: "success",
      lead: lead,
    });
  } catch (error) {
    res.status(500).json({
      mensaje: "Error al obtener el lead",
      errorMessage: error.message,
      stack: error.stack,
      error,
    });
  }
};

export const eliminarLead = async (req, res) => {
  const { id } = req.params;
  try {
    const lead = await Lead.findByPk(id);
    if (!lead)
      return res.status(404).json({
        status: "error",
        mensaje: "El lead no existe",
      });

    lead.estado = false;
    await lead.save();
    const listarLeads = await listLeads();
    res.status(200).json({
      status: "success",
      message: "Lead borrado con éxito",
      leadEliminado: lead,
      listaLeads: listarLeads,
    });
  } catch (error) {
    res.status(500).json({
      mensaje: "Error al eliminar el lead",
      errorMessage: error.message,
      stack: error.stack,
      error,
    });
  }
};
