// cspell: ignore razon
import { DataTypes } from "sequelize";
import sequelize from "../database/db.js";
import { Roles } from "./roles.model.js";

export const Clientes = sequelize.define("clientes", {
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
    allowNull: false,
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
  ruc: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  razon_social: {
    type: DataTypes.STRING,
    allowNull: true,
  },
});

// uno a uno

Clientes.belongsTo(Roles, {
  foreignKey: "id_rol",
  as: "rol",
});

// Roles.hasMany(Cliente, {
//   foreignKey: "id_rol",
//   as: "usuarios",
// });
