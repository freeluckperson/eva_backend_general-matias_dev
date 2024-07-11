// cspell: ignore PrestacionLegal,descripcionActividad, ocupacion, direccion, prestacion, kilometro, participacion, telefono, EIRL

import { DataTypes } from "sequelize";
import sequelize from "../database/db.js";

const PrestacionLegal = sequelize.define(
  "PrestacionLegal",
  {
    prestacionLegal_id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    nombre1: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    nombre2: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    nombre3: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    nombre4: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    nombre5: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    tipoEmpresa: {
      type: DataTypes.ENUM,
      values: ["SAC", "EIRL"],
      allowNull: false,
    },
    actividadEmpresa: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    descripcionActividad: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    esSocioDeLaEmpresa: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: false,
    },
    capitalTotal: {
      type: DataTypes.DECIMAL,
      allowNull: true,
    },
    tipoCapital: {
      type: DataTypes.ENUM,
      values: ["Efectivo", "Bienes", "Ambos"],
      allowNull: false,
    },
    efectivo: {
      type: DataTypes.DECIMAL,
      allowNull: true,
    },
    bienes: {
      type: DataTypes.DECIMAL,
      allowNull: true,
    },
    correoEmpresa: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    telefonoEmpresa: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    direccionFiscal: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    domicilioFiscal: {
      type: DataTypes.ENUM,
      values: ["Alquilado", "Propio"],
      allowNull: false,
    },
    regimenTributario: {
      type: DataTypes.ENUM,
      values: ["RER", "RMT", "RG"],
      allowNull: false,
    },
  },
  {
    tableName: "prestaciones_legales",
    timestamps: true,
  }
);

export default PrestacionLegal;
