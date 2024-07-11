//cspell: ignore originalname
import Express from "express";

import multer from "multer";

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    console.log("Destino del archivo:", "uploads/documentos"); // Log destino
    cb(null, "uploads/documentos");
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    console.log("Nombre original del archivo:", file.originalname); // Log nombre original
    console.log(
      "Nombre generado del archivo:",
      uniqueSuffix + "-" + file.originalname
    ); // Log nombre generado
    cb(null, uniqueSuffix + "-" + file.originalname);
  },
});
const upload = multer({
  storage: storage,
  fileFilter: (req, file, cb) => {
    console.log("Tipo de archivo recibido:", file.mimetype); // Log tipo de archivo
    cb(null, true);
  },
});

import registrarCLiente from "../controllers/cliente.controller/registrar.cliente.controller.js";
import clientesTotales from "../controllers/cliente.controller/obtener.clientes.controller.js";
import obtenerCliente from "../controllers/cliente.controller/obtener.cliente.controller.js";
import eliminarCliente from "../controllers/cliente.controller/eliminar.cliente.controller.js";
import editarCliente from "../controllers/cliente.controller/editar.cliente.controller.js";
import cargarDocumentos from "../controllers/cliente.controller/documentos.cliente.controller.js";

const router = Express.Router();

router.get("/clientes", clientesTotales);
router.get("/cliente/:id", obtenerCliente);
router.put("/cliente/:id", editarCliente);
router.delete("/cliente/:id", eliminarCliente);
router.post("/registro-cliente", registrarCLiente);
router.post("/login");
router.post("/documentos-cliente/:id", upload.single("ruc"), cargarDocumentos);

// const uploads = multer({ dest: "uploads/documentos" });
// router.post("/test-upload", uploads.single("ruc"), (req, res) => {
//   console.log("Archivo recibido:", req.file);
//   res.status(200).send("Archivo subido");
// });


export default router;
