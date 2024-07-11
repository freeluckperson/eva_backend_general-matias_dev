import jwt from 'jsonwebtoken';
import config from '../config/config.js';
import { generarJWT } from '../utils/token.js';

export const verificarTokenRefresh = (req, res, next) => {
    const tokenRefresco = req.headers["x-refresh-token"];
  console.log("tokenRefresco", tokenRefresco)
  if (!tokenRefresco) {
    return res.status(401).json({ msg: 'No hay token de refresco, permiso no válido' });
  }

  try {
    // Verificar el token de refresco
    const cifrado = jwt.verify(tokenRefresco, config.secret);
    console.log("cifrado", cifrado)
    let rol = cifrado.rol_usuario;
    let id_usuario = cifrado.id_usuario;
    let email = cifrado.email;
    // Aquí podrías opcionalmente verificar en la base de datos que el token de refresco es válido

    // Generar un nuevo token de acceso
    generarJWT(cifrado.id_usuario, cifrado.email, cifrado.rol_usuario)
      .then(({ token }) => {
        res.json({ token, id_usuario, rol, email });  // Enviar el nuevo token de acceso al cliente
      })
      .catch(err => {
        res.status(500).json({ msg: 'No se pudo generar un nuevo token' });
      });
  } catch (error) {
    res.status(401).json({
      msg: error.message
    });
  }
}

