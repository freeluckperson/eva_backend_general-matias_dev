//cspell: ignore dnicontadora,cambio_calificacion, cambioCalificacion, originalname, unico
import Express from "express";

import multer from "multer";

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/documentos");
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    cb(null, uniqueSuffix + "-" + file.originalname);
  },
});
const upload = multer({
  storage: storage,
});

import {
  actualizarUsuario,
  cambiarRolUsuarioPostulateAContadora,
  crearUsuarioPostulante,
  eliminarUsuario,
  listaUsuariosRolesActivo,
  obtenerUsuario,
  obtenerUsuariosTotales,
  crearUsuarioCompleto,
  loginUsuario,
  getDNIContadora,
  cambioCalificacion,
  cargarDocumentos,
  obtenerDocumentos,
} from "../controllers/usuarios.controller.js";

const router = Express.Router();

router.get("/usuarios", obtenerUsuariosTotales);
router.get("/usuarios/:id", obtenerUsuario);
router.post("/usuarios_postulante", crearUsuarioPostulante);
router.put("/usuarios/:id", actualizarUsuario);
router.put("/cambio_rol_postulante/:id", cambiarRolUsuarioPostulateAContadora);
router.delete("/usuarios/:id", eliminarUsuario);
router.get("/usuarios_roles/:id_rol", listaUsuariosRolesActivo);
router.post("/usuarios", crearUsuarioCompleto);
router.post("/login", loginUsuario);
router.get("/dnicontadora/:dni", getDNIContadora);
router.put("/cambio_calificacion/:id", cambioCalificacion);
router.post(
  "/documentos-postulante/:id",
  upload.fields([{ name: "curriculum" }, { name: "cul" }]),
  cargarDocumentos
);
router.get("/documentos-postulante/:id", obtenerDocumentos);

export default router;
