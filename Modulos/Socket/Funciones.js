// Funcion que permite generar una URL para una sala privada de videollamada
exports.generarURL = function() {
  var result, i, j;
  result = '';
  for (j = 0; j < 32; j++) {
    if (j == 8 || j == 12 || j == 16 || j == 20)
      result = result + '-';
    i = Math.floor(Math.random() * 16).toString(16).toUpperCase();
    result = result + i;
  }
  return result;
}

exports.generarDatosPaciente = function (datos , url ) {
  let Sala = {};
  Sala['nombreLocal'] = `${datos.nombrePac} ${datos.apellido1Pac} ${datos.apellido2Pac}`;
  Sala['nombreRemoto'] = `${datos.nombreVis} ${datos.apellido1Vis} ${datos.apellido2Vis}`;
  Sala['nss'] = datos.nss;
  Sala['regreso'] = '../Paciente'; 
  Sala['url'] = url;
  return Sala;
}

exports.generarDatosVisitante = function (datos , url) {
  let Sala = {};
  Sala['nombreRemoto'] = `${datos.nombrePac} ${datos.apellido1Pac} ${datos.apellido2Pac}`;
  Sala['nombreLocal'] = `${datos.nombreVis} ${datos.apellido1Vis} ${datos.apellido2Vis}`;
  Sala['regreso'] = '../Visitante'; 
  Sala['url'] = url;
  return Sala;
}