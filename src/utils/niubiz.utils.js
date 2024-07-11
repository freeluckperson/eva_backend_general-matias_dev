import pkg from 'base-64';
const { encode } = pkg;

export class NiubizUtils {
  static encodeBase64Credentials(username, password) {
    const credentials = `${username}:${password}`;
    const encodedCredentials = encode(credentials);
    return encodedCredentials;
  }

  static diferenciaDeDias(fechaCreacion = new Date()) {
    let fechaActual = new Date(); // Fecha actual

    // Diferencia en milisegundos
    let diferenciaMs = fechaActual - fechaCreacion;

    // Convertir milisegundos a días
    let diferenciaDias = diferenciaMs / (1000 * 60 * 60 * 24);

    // Redondear al número entero más cercano para obtener un número entero de días
    diferenciaDias = Math.floor(diferenciaDias);
    return diferenciaDias;
  }
}