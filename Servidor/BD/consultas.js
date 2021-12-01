
const obtenerSecciones = "SELECT * FROM seccion";
const consultarAdm = "SELECT idAdm FROM administrativo WHERE matricula = ? AND pwd = AES_ENCRYPT(?,?)"
const consultarEnc = "SELECT idSec FROM encargado WHERE idAdm = ? AND idSec = ?";

const almacenarUsuario = "INSERT INTO usuario Set ? ";
const consultarUsuario = "SELECT nombreVis , apellido1Vis , apellido2Vis FROM usuario WHERE idUsu = ?";

const consultarEntrada = "SELECT idReg FROM registro WHERE idUsu = ? AND Fecha = ?";
const almacenarEntrada = "INSERT INTO registro Set ?";

const consultarSalida = "SELECT idReg FROM registro WHERE idUsu = ? AND Fecha = ? AND HoraSalida = '00:00:00' ";
const almacenarSalida = "UPDATE registro SET HoraSalida = ? WHERE idUsu = ? AND Fecha = ? AND HoraSalida = '00:00:00'";

module.exports = {
    obtenerSecciones,
    consultarAdm,
    consultarEnc,
    almacenarUsuario,
    consultarUsuario,
    consultarEntrada,
    almacenarEntrada,
    consultarSalida,
    almacenarSalida
};