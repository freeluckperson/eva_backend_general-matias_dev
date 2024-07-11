
//  cspell: ignore Kilometro, ocupacion, telefono, porcentajeParticipacion, PrestacionLegal, kilometro, prestacionLegal_id, prestacionLegal

import sequelize from "../database/db.js";
import PrestacionLegal from "./prestacionLegal.model.js";
import Socio from "./socios.model.js";


PrestacionLegal.hasMany(Socio, {
  foreignKey: "prestacionLegalId",
  as: "socios",
});

Socio.belongsTo(PrestacionLegal, {
  foreignKey: "prestacionLegalId",
  as: "prestacionLegal",
});


sequelize.sync();

export { PrestacionLegal, Socio };
