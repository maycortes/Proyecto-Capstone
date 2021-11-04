// Permite generar un codigo QR
const qrcode = require('qrcode');

// Funcion que pemrite generar un codigo QR
exports.GenerarQR = async function(datos){
    const QR = await qrcode.toDataURL(datos);
    return QR;
}