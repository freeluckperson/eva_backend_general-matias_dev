import {Roles} from '../models/roles.model.js'; // Asegúrate de que la ruta al modelo es correcta

export const obtenerRolesActivos = async () => {
    return await Roles.findAll({
        where: { estado: true },
        order: [['nombre', 'ASC']]
    });
};