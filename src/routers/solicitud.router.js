import Express from "express";

import {
    crearSolicitud,
    getListaSolicitudes
} from "../controllers/solicitud.controller.js";

const router = Express.Router();

router.post("/solicitud", crearSolicitud);

router.get("/solicitudes", getListaSolicitudes);


export default router;