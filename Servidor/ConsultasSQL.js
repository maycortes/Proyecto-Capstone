// Modulo mysql llamada del archivo dependencis
const { mysql } = require('./Dependencias');

// Conexion con la BD
const { conexion , codigo } = require('./BD/informacionBD');
const conn = mysql.createConnection(conexion);

// Módulo UTIL que permite cambiar los collback por promesas
const {promisify} = require('util');
conn.query = promisify(conn.query);

// Modulo local que almacena las consultas
const consultas = require('./BD/consultas');

// Funcion que permite saber si un Administrativo tiene acceso a una pagina
async function obtenerAcceso( {matricula,pwd,seccion} ){
    return await conn.query( consultas.consultarAdm , [ matricula , pwd , codigo ] )
    .then( ( adm ) => {
        return (adm.length == 1) ? conn.query( consultas.consultarEnc , [ adm[0].idAdm , seccion ] ) : [];
    }).then( ( sec ) => {
        return (sec.length > 0 && sec[0].idSec == seccion) ? { acceso : true , seccion : seccion } : { acceso : false };
    }).catch( (error) => {
        return { acceso : false };
    })
}

// Funcion que permite almacenar un usuario ( paciente y visitante )
async function almacenarUsuario( data ) {
    data.idUsu = 0;
    return await conn.query( consultas.almacenarUsuario , data )
        .then( res =>{ return { insercion : true , id : res.insertId } })
        .catch( error => { return { insercion : false } })
}

// Funcion para consultar usuario
async function consultarUsuario(id){
    return await conn.query( consultas.consultarUsuario , [ id ] )
        .then( respuesta => respuesta )
        .catch(error => error);
}

// Funcion para consultar fecha y hora de entrada
async function consultarEntrada( id ){
    let fecha = fechaActual();
    return await conn.query( consultas.consultarEntrada , [ id , fecha ] )
    .then( respuesta => respuesta )
    .catch(error => error);
}

// Funcion para almacenar fecha y hora de entrada
async function almacenarEntrada( id ){
    let data = { idReg : 0 , Fecha : fechaActual() , HoraEntrada : horaActual() , idUsu : id , HoraSalida : "00:00:00" }
    return await conn.query( consultas.almacenarEntrada , data )
        .then( res => { return { insercion : true } } )
        .catch(error => { return { insercion : false } });
}

// Funcion para consultar Salida
async function consultarSalida( id ){
    return await conn.query( consultas.consultarSalida , [ id , fechaActual() ] )
    .then( respuesta => respuesta )
    .catch(error => error);
}

// Funcion para almacenar fecha y hora de salida
async function almacenarSalida( id ){
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

module.exports = {
    obtenerAcceso , 
    almacenarUsuario , 
    consultarUsuario , 
    consultarEntrada , 
    almacenarEntrada ,
    consultarSalida ,
    almacenarSalida
}