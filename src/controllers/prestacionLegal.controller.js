// cspell: ignore prestacion, asociacion

import {
  PrestacionLegal,
  Socio,
} from "../models/prestLegal-socios.asociacion.js";

export const createPrestacionLegal = async (req, res) => {
  const { socios, ...prestacionLegalData } = req.body;

  try {
    const prestacionLegal = await PrestacionLegal.create(prestacionLegalData);
    if (socios && socios.length > 0) {
      const sociosData = socios.map((socio) => ({
        ...socio,
        prestacionLegalId: prestacionLegal.prestacionLegal_id,
      }));
      await Socio.bulkCreate(sociosData);
    }

    const prestacionLegal_Socios = await PrestacionLegal.findByPk(
      prestacionLegal.prestacionLegal_id,
      {
        include: [
          {
            model: Socio,
            as: "socios",
          },
        ],
      }
    );
    res.status(201).json({
      status: "success",
      prestacionLegal: prestacionLegal_Socios,
    });
  } catch (error) {
    res.status(500).json({
      status: "error",
      message: "Error al crear la prestación legal",
      errorMessage: error.message,
      stack: error.stack,
      error,
    });
  }
};

export const getPrestacionesLegales = async (req, res) => {
  try {
    const prestacionesLegales = await PrestacionLegal.findAll({
      include: [
        {
          model: Socio,
          as: "socios",
        },
      ],
    });
    res.status(200).json({
      status: "success",
      cantidad: prestacionesLegales.length,
      prestacionesLegales: prestacionesLegales,
    });
  } catch (error) {
    res.status(500).json({
      status: "error",
      message: "Error al obtener las prestaciones legales",
      errorMessage: error.message,
      stack: error.stack,
      error,
    });
  }
};

export const getPrestacionLegal = async (req, res) => {
  try {
    const prestacionLegal = await PrestacionLegal.findByPk(req.params.id, {
      include: [
        {
          model: Socio,
          as: "socios",
        },
      ],
    });
    res.status(200).json({
      status: "success",
      prestacionLegal: prestacionLegal,
    });
  } catch (error) {
    res.status(500).json({
      status: "error",
      message: "Error al obtener la prestacion legal",
      errorMessage: error.message,
      stack: error.stack,
      error,
    });
  }
};

export const actualizarPrestacionLegal = async (req, res) => {
  try {
    const prestacionLegal = await PrestacionLegal.findByPk(req.params.id, {
      include: [
        {
          model: Socio,
          as: "socios",
        },
      ],
    });
    if (!prestacionLegal) {
      return res.status(404).json({
        status: "error",
        message: "Prestacion legal no encontrada",
      });
    }
    const prestacionLegalActualizada = await prestacionLegal.update(req.body);
    res.status(200).json({
      status: "success",
      prestacionLegal: prestacionLegalActualizada,
    });
  } catch (error) {
    res.status(500).json({
      status: "error",
      message: "Error al actualizar la prestacion legal",
      errorMessage: error.message,
      stack: error.stack,
      error,
    });
  }
};

export const eliminarPrestacionLegal = async (req, res) => {
  try {
    const prestacionLegal = await PrestacionLegal.findByPk(req.params.id);
    if (!prestacionLegal) {
      return res.status(404).json({
        status: "error",
        message: "Prestacion legal no encontrada",
      });
    }
    await prestacionLegal.destroy();
    res.status(200).json({
      status: "success",
      message: "Prestacion legal eliminada correctamente",
    });
  } catch (error) {
    res.status(500).json({
      status: "error",
      message: "Error al eliminar la prestacion legal",
      errorMessage: error.message,
      stack: error.stack,
      error,
    });
  }
};
