// cspell: ignore prestacion, niubiz

import cors from "cors";
import express from "express";
import morgan from "morgan";
import compression from "compression";
import helmet from "helmet";
import fileUpload from "express-fileupload";

import sequelize from "./database/db.js";

import roles from "./routers/roles.router.js";
import usuario from "./routers/usuario.router.js";
import lead from "./routers/lead.router.js";
import solicitud from "./routers/solicitud.router.js";
import documento from "./routers/documento.router.js";
import niubiz from "./routers/niubiz.router.js";
import cliente from "./routers/cliente.router.js";
import prestacionLegal from "./routers/prestacionLegal.router.js";

export const app = express();

app.use(cors());
app.use(express.json());
app.use(fileUpload({
  useTempFiles : true,
  tempFileDir : './uploads'
}));
app.use(express.urlencoded({ extended: true }));
app.use(morgan("dev"));
app.use(compression());
app.use(helmet());

export const connectDatabase = async () => {
  try {
    await sequelize.authenticate();
    await sequelize.sync({ force: false });
    console.log("DB connection has been established successfully.");
  } catch (error) {
    console.error("Unable to connect to the database:", error.message);
  }
};
// export const connectDatabase = async () => {
//   try {
//     await sequelize.authenticate();
//     sequelize.sync({ force: false });
//     console.log("Connection has been established successfully.");
//   } catch (error) {
//     console.error("Unable to connect to the database:", error.message);
//   }
// };
app.use("/api", roles);
app.use("/api", usuario);
app.use("/api", lead);
app.use("/api", solicitud);
app.use("/api", documento);
app.use("/api", niubiz);
app.use("/api", cliente);
app.use("/api", prestacionLegal);
