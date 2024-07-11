import { DataTypes } from "sequelize";
import sequelize from "../database/db.js";
import { Documento } from "./documento.model.js";
import { Usuarios } from "./usuario.model.js";

export const Solicitud = sequelize.define("solicitudes", {
    id_solicitud: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    tipo_solicitud: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    id_cliente: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    id_contadora: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    etapa: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    estado: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: true
    },
}
);

Solicitud.hasMany(Documento, {
    foreignKey: 'id_solicitud',
    as: 'documentos'
});

Documento.belongsTo(Solicitud, {
    foreignKey: 'id_solicitud',
    as: 'solicitud'
});

// Relaciones para cliente y contadora
Solicitud.belongsTo(Usuarios, {
    foreignKey: 'id_cliente',
    as: 'cliente'
});
Solicitud.belongsTo(Usuarios, {
    foreignKey: 'id_contadora',
    as: 'contadora'
});

// Asegúrate de establecer la relación inversa en Usuarios si es necesario
Usuarios.hasMany(Solicitud, {
    foreignKey: 'id_cliente',
    as: 'solicitudesComoCliente'
});
Usuarios.hasMany(Solicitud, {
    foreignKey: 'id_contadora',
    as: 'solicitudesComoContadora'
});