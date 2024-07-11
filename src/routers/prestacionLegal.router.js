// cspell: ignore prestacion
import express from "express";
import {
  actualizarPrestacionLegal,
  createPrestacionLegal,
  eliminarPrestacionLegal,
  getPrestacionLegal,
  getPrestacionesLegales,
} from "../controllers/prestacionLegal.controller.js";
const router = express.Router();

router.post("/prestacion-legal", createPrestacionLegal);
router.get("/prestaciones-legales", getPrestacionesLegales);
router.get("/prestacion-legal/:id", getPrestacionLegal);
router.put("/prestacion-legal/:id", actualizarPrestacionLegal);
router.delete("/prestacion-legal/:id", eliminarPrestacionLegal);

export default router;
