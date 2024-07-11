import { Usuarios } from "../models/usuario.model.js";
import { Roles } from "../models/roles.model.js";
import { Documento } from "../models/documento.model.js";
import { Solicitud } from "../models/solicitud.model.js";

export const getDocumentos = async (req, res) => {
  try {
    const documentos = await Documento.findAll({
      where: {
        estado: true,
      },
    });

    res.status(200).json({
      status: "success",
      cantidad: documentos.length,
      documentosLista: documentos,
    });
  } catch (error) {
    res.status(500).json({
      mensaje: "Error al obtener los documentos",
      errorMessage: error.message,
      stack: error.stack,
      error,
    });
  }
};

export const crearDocumento = async (req, res) => {
  const { tipo, nombre, link, id_solicitud } = req.body;

  console.log(req.body);
  try {
    const documento = await Documento.create({
      tipo,
      nombre,
      link,
      id_solicitud,
    });

    res.status(201).json({
      status: "success",
      documentoNuevo: documento,
    });
  } catch (error) {
    res.status(500).json({
      mensaje: "Error al crear el documento",
      errorMessage: error.message,
      stack: error.stack,
      error,
    });
  }
};
