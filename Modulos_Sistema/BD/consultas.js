
exports.obtenerSecciones = "SELECT * FROM seccion";
exports.consultarAdm = "SELECT idAdm FROM administrativo WHERE matricula = ? AND pwd = AES_ENCRYPT(?,?)";
exports.consultarEnc = "SELECT idSec FROM encargado WHERE idAdm = ? AND idSec = ?";

exports.almacenarUsuario = "INSERT INTO usuario Set ? ";
exports.consultarUsuario = "SELECT nombreVis , apellido1Vis , apellido2Vis FROM usuario WHERE idUsu = ?";

exports.consultarEntrada = "SELECT idReg FROM registro WHERE idUsu = ? AND Fecha = ?";
exports.almacenarEntrada = "INSERT INTO registro Set ?";

exports.consultarSalida = "SELECT idReg FROM registro WHERE idUsu = ? AND Fecha = ? AND HoraSalida = '00:00:00' ";
exports.almacenarSalida = "UPDATE registro SET HoraSalida = ? WHERE idUsu = ? AND Fecha = ? AND HoraSalida = '00:00:00'";

exports.datosSalaVideollama = "SELECT nombrePac , apellido1Pac , apellido2Pac , nombreVis , apellido1Vis , apellido2Vis , nss FROM usuario WHERE idUsu = ?";