//cspell: ignore cloudinary
import { Clientes } from "../../models/cliente.model.js";

import cloudinary from "../../config/cloudinary.config.js";
import fs from "fs";
import util from "util";

const unlinkFile = util.promisify(fs.unlink);

const cargarDocumentos = async (req, res) => {
  const { id } = req.params;

  const ruc = req.file;

  if (!ruc) {
    return res.status(400).json({
      status: "error",
      message: "Debe subir la documentación (RUC) ",
    });
  }

  if (ruc.mimetype !== "application/pdf") {
    return res.status(400).json({
      status: "error",
      message: "EL archivo debe ser PDF",
    });
  }

  try {
    const cliente = await Clientes.findByPk(id, {
      attributes: {
        exclude: ["password"],
      },
    });

    if (!cliente) {
      return res.status(404).json({
        status: "error",
        message: "cliente no encontrado",
      });
    }
    const folderName = "Eva";
    const nombreCompleto =
      `${cliente.nombre}_${cliente.apellido_paterno}_${cliente.apellido_materno}`.replace(
        / /g,
        "_"
      );

    const resultRUC = await cloudinary.uploader.upload(ruc.path, {
      folder: folderName,
      public_id: `ruc_${nombreCompleto}`,
    });

    cliente.ruc = resultRUC.secure_url;

    await cliente.save();

    try {
      await unlinkFile(ruc.path);
    } catch (err) {
      console.error("Error al eliminar el archivo local:", err);
    }

    res.status(200).json({
      status: "success",
      message: "Documentos subidos correctamente",
      postulante: cliente,
    });
  } catch (error) {
    return res.status(404).json({
      status: "Error",
      message: "Hubo problemas para subir documentación",
      message: error.message,
    });
  }
};

export default cargarDocumentos;
