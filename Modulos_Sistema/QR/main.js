/*####### MODULO PRINCIPAL PARA GENERAR CODIGOS QR #################*/

// Permite generar un codigo QR
const qrcode = require('qrcode');

// Funcion que pemrite generar un codigo QR
exports.GenerarCodigoQR = async function(datos){
    const QR = await qrcode.toDataURL(datos);
    return QR;
}