import axios from 'axios';
import xml2js from 'xml2js';

const soapTemplate = (nroOrganizacion, idUsuario, fechaDesde, fechaHasta) => `
<soapenv:Envelope xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/" xmlns:v1="http://bps.gub.uy/senf/wsCertOrganizaciones/v1">
   <soapenv:Header>
      <wsse:Security xmlns:wsse="http://docs.oasis-open.org/wss/2004/01/oasis-200401-wss-wssecurity-secext-1.0.xsd">
         <wsse:UsernameToken>
            <wsse:Username>IMSJ_P</wsse:Username>
            <wsse:Password>Mn22tp16</wsse:Password>
         </wsse:UsernameToken>
      </wsse:Security>
   </soapenv:Header>
   <soapenv:Body>
      <v1:obtenerCertificacionesOrganizacion>
         <paramObtenerCertificacionesOrganizacion>
            <nroOrganizacion> ${nroOrganizacion}</nroOrganizacion>
            <idUsuario>${idUsuario}</idUsuario>
            <fechaDesde>${fechaDesde}</fechaDesde>
            <fechaHasta>${fechaHasta}</fechaHasta>
         </paramObtenerCertificacionesOrganizacion>
      </v1:obtenerCertificacionesOrganizacion>
   </soapenv:Body>
</soapenv:Envelope>
`;

export const sendSoapRequest = async ({ nroOrganizacion, idUsuario, fechaDesde, fechaHasta }) => {
    const soapRequest = soapTemplate(nroOrganizacion, idUsuario, fechaDesde, fechaHasta);
    console.log('SOAP request:', soapRequest);
    try {
        const response = await axios.post('https://scs.bps.gub.uy:443/Salud/SENF/IntegracionHCENSNCL/ws/v1/wsCertOrganizaciones', soapRequest, {
            headers: {
                'Content-Type': 'text/xml',
                'SOAPAction': 'obtenerCertificacionesOrganizacion'
            }
        });

        console.log('SOAP response:', response.data);

        // Convertir la respuesta XML a JSON
        const jsonResponse = await xml2js.parseStringPromise(response.data, { explicitArray: false });
        return jsonResponse;
    } catch (error) {
        console.error('Error making SOAP request:', error.response ? error.response.data : error.message);
        throw new Error('Error making SOAP request: ' + (error.response ? error.response.data : error.message));
    }
};
