
exports.obtenerSecciones = "SELECT * FROM Seccion";
exports.consultarAdm = "SELECT idAdm FROM Administrativo WHERE matricula = ? AND pwd = AES_ENCRYPT(?,?)";
exports.consultarEnc = "SELECT idSec FROM Encargado WHERE idAdm = ? AND idSec = ?";

exports.almacenarUsuario = "INSERT INTO Usuario Set ? ";
exports.consultarUsuario = "SELECT nombreVis , apellido1Vis , apellido2Vis FROM Usuario WHERE idUsu = ?";

exports.consultarEntrada = "SELECT idReg FROM Registro WHERE idUsu = ? AND Fecha = ?";
exports.almacenarEntrada = "INSERT INTO Registro Set ?";

exports.consultarSalida = "SELECT idReg FROM Registro WHERE idUsu = ? AND Fecha = ? AND HoraSalida = '00:00:00' ";
exports.almacenarSalida = "UPDATE Registro SET HoraSalida = ? WHERE idUsu = ? AND Fecha = ? AND HoraSalida = '00:00:00'";

exports.datosSalaVideollama = "SELECT nombrePac , apellido1Pac , apellido2Pac , nombreVis , apellido1Vis , apellido2Vis , nss FROM Usuario WHERE idUsu = ?";