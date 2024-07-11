import { Solicitud } from "../models/solicitud.model.js";
import { Usuarios } from "../models/usuario.model.js";
import { Roles } from "../models/roles.model.js";
import { Documento } from "../models/documento.model.js";
import { serviceGetId } from "../service/solicitud.service.js";

export const crearSolicitud = async (req, res) => {
    const {
        tipo_solicitud,
        id_cliente,
        id_contadora,
        etapa,
    } = req.body;
    try {
        await Solicitud.create({
            tipo_solicitud,
            id_cliente,
            id_contadora,
            etapa,
        });


        res.json(await serviceGetId(id_cliente));


    } catch (error) {
        res.status(500).json({
            mensaje: "Error al crear la solicitud",
            errorMessage: error.message,
            stack: error.stack,
            error,
        });
    }
}

export const getListaSolicitudes = async (req, res) => {
    try {
        const solicitudes = await Solicitud.findAll({
            where: {
                estado: true
            },
            include: [
                {
                    model: Usuarios,
                    as: "cliente",
                    attributes: {
                        exclude: ["password"]
                    }
                },
                {
                    model: Usuarios,
                    as: "contadora",
                    attributes: {
                        exclude: ["password"]
                    }
                },
                {
                    model: Documento,
                    as: "documentos",

                }
            ],
            order: [["id_solicitud", "DESC"]],
        });

        // Procesar cada solicitud para filtrar los documentos
        const solicitudesFiltradas = solicitudes.map(solicitud => {
            // Asegúrate de que 'solicitud.documentos' es manipulable; de lo contrario, usa solicitud.getDataValue('documentos')
            const documentos = solicitud.getDataValue ? solicitud.getDataValue('documentos') : solicitud.documentos;

            // Agrupar documentos por tipo
            const documentosAgrupadosPorTipo = documentos.reduce((acc, documento) => {
                (acc[documento.tipo] = acc[documento.tipo] || []).push(documento);
                return acc;
            }, {});

            // Para cada tipo, mantener solo el documento más reciente
            const documentosFiltrados = Object.values(documentosAgrupadosPorTipo).map(documentosDelMismoTipo => {
                // Ordenar descendientemente por 'id_documento'
                return documentosDelMismoTipo.sort((a, b) => b.id_documento - a.id_documento)[0];
            });

            // Reemplazar los documentos originales con los filtrados
            return {
                ...solicitud.toJSON(), // Convierte el modelo Sequelize a un objeto si es necesario
                documentos: documentosFiltrados
            };
        });


        res.json(solicitudesFiltradas);

    } catch (error) {
        res.status(500).json({
            mensaje: "Error al obtener la lista de solicitudes",
            errorMessage: error.message,
            stack: error.stack,
            error,
        });
    }
}

export const getSolicitud = async (req, res) => {
    const { id } = req.params;
    try {

        const solicitud = await serviceGetId(id);
        res.json(solicitud);
    } catch (error) {
        res.status(500).json({
            mensaje: "Error al obtener la solicitud",
            errorMessage: error.message,
            stack: error.stack,
            error,
        });
    }
}


