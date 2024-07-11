import Express from "express";
import { listarRoles, actualizarRol, crearRol, eliminarRol, obtenerRol } from "../controllers/roles.controller.js";
import { verificarTokenRefresh } from "../middlewares/authMiddlewares.js";
import { verificarRol } from "../utils/verificarRol.js";

const router = Express.Router();

router.get("/roles", listarRoles); // Preguntar bien
router.get("/roles/:id", obtenerRol); // listo
router.post("/roles", crearRol); // Listo
router.put("/roles/:id", actualizarRol);
router.delete("/roles/:id", eliminarRol);


export default router;


