import sequelize from "./db.js";

import { Usuarios } from "../models/usuarios.model.js";
import { Roles } from "../models/roles.model.js";

Usuarios.belongsTo(Roles, {
  foreignKey: "id_rol",
  as: "rol",
});

Roles.hasMany(Usuarios, {
  foreignKey: "id_rol",
  as: "usuarios",
});
