
import jwt from "jsonwebtoken";
import config from "../config/config.js";


export const generarJWT = (id_usuario, email, rol_usuario) => {
    return new Promise((resolve, reject) => {
      const payload = { id_usuario, email, rol_usuario };
  
      // Generar JWT
      jwt.sign(payload, config.secret, { expiresIn: Number(config.jwtExpiresIn) }, (err, token) => {
        if (err) {
          console.log(err);
          reject('No se pudo generar el JWT' + err);
        } else {
          // Generar token de refresco con una fecha de expiración más larga
          jwt.sign(payload, config.secret, { expiresIn: '7d' }, (err, refreshToken) => {
            if (err) {
              console.log(err);
              reject('No se pudo generar el token de refresco', err);
            } else {
              resolve({ token, refreshToken });
            }
          });
        }
      });
    });
  };
  