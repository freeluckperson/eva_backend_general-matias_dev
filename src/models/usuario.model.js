// cspell: ignore anio, motivacion, unico, calificacion
import { DataTypes } from "sequelize";
import sequelize from "../database/db.js";
import { Roles } from "./roles.model.js";



export const Usuarios = sequelize.define("usuarios", {
  id_usuario: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  nombre: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  apellido_materno: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  apellido_paterno: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  dni: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  colegiada: {
    type: DataTypes.BOOLEAN,
    allowNull: false,
  },
  anio_experiencia: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  motivacion: {
    type: DataTypes.TEXT,
    allowNull: true,
  },
  archivo_cv: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  certificado_unico_laboral: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  celular: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  password: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  id_rol: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  estado: {
    type: DataTypes.BOOLEAN,
    allowNull: false,
    defaultValue: true,
  },
  calificacion: {
    type: DataTypes.FLOAT,
    allowNull: true,
  },
});

// uno a uno

Usuarios.belongsTo(Roles, {
  foreignKey: "id_rol",
  as: "rol",
});

Roles.hasMany(Usuarios, {
  foreignKey: "id_rol",
  as: "usuarios",
});
