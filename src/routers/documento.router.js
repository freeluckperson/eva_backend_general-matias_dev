import Express from "express";

import {
  crearDocumento,
  getDocumentos,
} from "../controllers/documento.controller.js";

const router = Express.Router();

router.get("/documentos", getDocumentos); // Listo
router.post("/documentos", crearDocumento); // Listo

export default router;
