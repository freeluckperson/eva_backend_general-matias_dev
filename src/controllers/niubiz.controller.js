import axios from 'axios';
import config from '../config/config.js';
import { NiubizUtils } from '../utils/niubiz.utils.js';

export const getSecurityData = async () => {
  try {
    const niubizCredentials = {
      user: config.NIUBIZ_USER || "integraciones@niubiz.com.pe",
      password: config.NIUBIZ_PASSWORD || "_7z3@8fF",
    };

    const credentials = NiubizUtils.encodeBase64Credentials(
      niubizCredentials.user,
      niubizCredentials.password
    );

    const response = await axios.get(
      `${
        config.NIUBIZ_URL_SECURITY ||
        "https://apisandbox.vnforappstest.com/api.security"
      }/v1/security`,
      {
        headers: {
          Authorization: `Basic ${credentials}`,
        },
      }
    );

    return response.data;
  } catch (error) {
    throw error;
  }
};

export const getSessionToken = async (req, res) => {

    const { email, amount, fechaCreacion } = req.body;
    try {
        const ip = req.ip;
        const tokenSegurity = await getSecurityData();

        const response = await axios.post(
            `${config.NIUBIZ_URL_ECOMMERCE ||
            "https://apisandbox.vnforappstest.com/api.ecommerce"
            }/v2/ecommerce/token/session/${config.NIUBIZ_MERCHANT_ID || "456879852"}`,
            {
                channel: "web",
                amount,
                antifraud: {
                    clientIp: ip,
                    merchantDefineData: {
                        MDD4: email,
                        MDD21: 1,
                        MDD32: email,
                        MDD75: "Registrado", //Registrado, Invitado, Empleado
                        MDD77: NiubizUtils.diferenciaDeDias(new Date(fechaCreacion)),
                    },
                },
            },
            {
                headers: {
                    Authorization: `${tokenSegurity}`,
                },
            }
        );
        return res.json(response.data);
    } catch (error) {
        res.status(500).json({
            mensaje: "Error al hacer el token de la pasarela",
            errorMessage: error.message,
            stack: error.stack,
            error
        });
    }
};


export const getRespuesta = async (req, res) => {
    const respuesta = req.body

    try {
        console.log(respuesta)
        return res.json(respuesta);
    } catch (error) {
        res.status(500).json({
            mensaje: "Error al hacer ela impresión",
            errorMessage: error.message,
            stack: error.stack,
            error
        })
    }
}
