// Modulo local Dependencias
const { mysql , promisify } = require('../Dependencias');
// Obtener datos para la conexion con la BD
const { conexion , codeServer } = require('../Datos');

// Conexion con la BD
const conn = mysql.createConnection(conexion);

// Cambio de collback a promesa para consultas en mysql
conn.query = promisify(conn.query);

// Modulo local que almacena las consultas
const consultas = require('./consultas');

// Funcion que permite saber si un Administrativo tiene acceso a una pagina
exports.obtenerAcceso = async function ( {matricula,pwd,seccion} ){
    return await conn.query( consultas.consultarAdm , [ matricula , pwd , codeServer ] )
    .then( ( adm ) => {
        return (adm.length == 1) ? conn.query( consultas.consultarEnc , [ adm[0].idAdm , seccion ] ) : [];
    }).then( ( sec ) => {
        return (sec.length > 0 && sec[0].idSec == seccion) ? { acceso : true , seccion : seccion } : { acceso : false };
    }).catch( (error) => {
        return { acceso : false };
    })
}

// Funcion que permite almacenar un usuario ( paciente y visitante )
exports.almacenarUsuario = async function ( data ) {
    data.idUsu = 0;
    return await conn.query( consultas.almacenarUsuario , data )
        .then( res =>{ return { insercion : true , id : res.insertId } })
        .catch( error => { return { insercion : false } })
}

// Funcion para consultar usuario
exports.consultarUsuario = async function (id){
    return await conn.query( consultas.consultarUsuario , [ id ] )
        .then( respuesta => respuesta )
        .catch(error => error);
}

// Funcion para consultar fecha y hora de entrada
exports.consultarEntrada = async function ( id ){
    let fecha = fechaActual();
    return await conn.query( consultas.consultarEntrada , [ id , fecha ] )
    .then( respuesta => respuesta )
    .catch(error => error);
}

// Funcion para almacenar fecha y hora de entrada
exports.almacenarEntrada = async function ( id ){
    let data = { idReg : 0 , Fecha : fechaActual() , HoraEntrada : horaActual() , idUsu : id , HoraSalida : "00:00:00" }
    return await conn.query( consultas.almacenarEntrada , data )
        .then( res => { return { insercion : true } } )
        .catch(error => { return { insercion : false } });
}

// Funcion para consultar Salida
exports.consultarSalida = async function ( id ){
    return await conn.query( consultas.consultarSalida , [ id , fechaActual() ] )
    .then( respuesta => respuesta )
    .catch(error => error);
}

// Funcion para almacenar fecha y hora de salida
exports.almacenarSalida = async function ( id ){
    return await conn.query( consultas.almacenarSalida , [ horaActual() , id , fechaActual() ,  ] )
        .then( res => { return { insercion : true } } )
        .catch(error => { return { insercion : false } });
}

function fechaActual(){
    let date = new Date();
    return date.getFullYear() + "-" + (date.getMonth()+1) + "-" + date.getDate();
}

function horaActual(){
    let date = new Date();
    return date.getHours() + ":" + date.getMinutes() + ":" + date.getSeconds();
}

// Funcion para obtener datos para la sala de videollada
exports.datosSalaVideollama = async function ( id ){
    return await conn.query( consultas.datosSalaVideollama , [ id ] )
        .then( res => res )
        .catch(error => { return [] });
}