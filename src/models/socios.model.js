//  cspell: ignore Kilometro, ocupacion, telefono, porcentajeParticipacion, PrestacionLegal, kilometro, prestacionLegal_id, prestacionLegal

import { DataTypes } from "sequelize";
import sequelize from "../database/db.js";

const Socio = sequelize.define("Socio", {
  id_Socio: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  nombreSocio: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  apellidoSocio: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  emailSocio: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  cargoSocio: {
    type: DataTypes.ENUM,
    values: ["Gerente General", "Sub Gerente", "Sin Cargo"],
    allowNull: false,
  },
  nombresCoFundador: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  apellidosCoFundador: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  tipoDocumento: {
    type: DataTypes.ENUM,
    values: ["DNI", "PAS", "CE", "PTP", "RUC"],
    allowNull: false,
  },
  numeroDocumento: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  ocupacion: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  nacionalidad: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  telefono: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  nombreZona: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  nombreVia: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  numero: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  kilometro: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  manzana: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  interior: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  Departamento: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  estadoCivil: {
    type: DataTypes.ENUM,
    values: ["Soltero/a", "Casado/a", "Divorciado/a", "Viudo/a"],
    allowNull: false,
  },
  capitalEfectivo: {
    type: DataTypes.DECIMAL,
    allowNull: true,
  },
  capitalBienes: {
    type: DataTypes.DECIMAL,
    allowNull: true,
  },
  porcentajeParticipacion: {
    type: DataTypes.DECIMAL,
    allowNull: false,
  },
  prestacionLegal_id: {
    type: DataTypes.INTEGER,
    references: {
      model: "PrestacionLegal",
      key: "prestacionLegal_id",
    },
  },
});

export default Socio;
