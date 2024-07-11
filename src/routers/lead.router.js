import { eliminarLead, crearLead, listarLeads, obtenerLead } from "../controllers/lead.controller.js";
import Express from "express";

const router = Express.Router();

router.get("/leads", listarLeads); // Listo
router.get("/leads/:id", obtenerLead); // Listo
router.post("/leads", crearLead); // Listo
router.delete("/leads/:id", eliminarLead); // Listo

export default router;