import { Usuarios } from "../models/usuario.model.js";
import { Roles } from "../models/roles.model.js";
import { Documento } from "../models/documento.model.js";
import { Solicitud } from "../models/solicitud.model.js";

export const serviceGetId = async (id) => {
    const solicitudes = await Solicitud.findAll({
        where: {
            estado: true,
            id_cliente: id

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
                as: "documentos"
            }
        ],
        order: [["id_solicitud", "DESC"]]
    });

    return solicitudes;
}