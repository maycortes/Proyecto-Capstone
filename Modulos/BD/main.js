// Modulo local Dependencias
const { mariadb } = require('../Dependencias');
// Obtener datos para la conexion con la BD
const { conexion , codeServer } = require('../Datos');

// Modulo local que almacena las consultas
const consultas = require('./consultas');

// Funcion que permite saber si un Administrativo tiene acceso a una pagina
exports.obtenerAcceso = async function ( {matricula,pwd,seccion} ){
    const pool = mariadb.createPool(conexion);
    let conn = await pool.getConnection();
    return await conn.query( consultas.consultarAdm , [ matricula , pwd , codeServer ] )
    .then( ( adm ) => {
        return (adm.length == 1) ? conn.query( consultas.consultarEnc , [ adm[0].idAdm , seccion ] ) : [];
    }).then( ( sec ) => {
        pool.end();
        return (sec.length > 0 && sec[0].idSec == seccion) ? { acceso : true , seccion : seccion } : { acceso : false };
    }).catch( (error) => {
        pool.end();
        return { acceso : false };
    })
}

// Funcion que permite almacenar un usuario ( paciente y visitante )
exports.almacenarUsuario = async function ( dato ) {
    const pool = mariadb.createPool(conexion);
    let conn = await pool.getConnection();
    return await conn.query( convertirConsulta( consultas.almacenarUsuario , dato ) )
        .then( res =>{ 
            pool.end();
            return { insercion : true , id : res.insertId } 
        })
        .catch( error => {  
            pool.end(); 
            return { insercion : false } 
        })
}

// Funcion para consultar usuario
exports.consultarUsuario = async function (id){
    const pool = mariadb.createPool(conexion);
    let conn = await pool.getConnection();
    return await conn.query( consultas.consultarUsuario , [ id ] )
        .then( respuesta => {
            pool.end();
            return respuesta;
        })
        .catch(error => {
            pool.end();
            console.log(error);
        });
}

// Funcion para consultar fecha y hora de entrada
exports.consultarEntrada = async function ( id ){
    const pool = mariadb.createPool(conexion);
    let conn = await pool.getConnection();
    let fecha = fechaActual();
    return await conn.query( consultas.consultarEntrada , [ id , fecha ] )
    .then( respuesta => {
        pool.end();
        return respuesta;
    })
    .catch(error => {
        pool.end();
        return [];
    });
}

// Funcion para almacenar fecha y hora de entrada
exports.almacenarEntrada = async function ( id ){
    const pool = mariadb.createPool(conexion);
    let conn = await pool.getConnection();
    let data = { Fecha : fechaActual() , HoraEntrada : horaActual() , idUsu : id , HoraSalida : "00:00:00" }
    return await conn.query( convertirConsulta( consultas.almacenarEntrada , data ) )
        .then( res => { 
            pool.end();
            return { insercion : true } 
        })
        .catch(error => { 
            console.log(error);
            pool.end();
            return { insercion : false } 
        });
}

// Funcion para consultar Salida
exports.consultarSalida = async function ( id ){
    const pool = mariadb.createPool(conexion);
    let conn = await pool.getConnection();
    return await conn.query( consultas.consultarSalida , [ id , fechaActual() ] )
    .then( respuesta => {
        pool.end();
        return respuesta
    })
    .catch(error => {
        pool.end();
        console.log(error);
    });
}

// Funcion para almacenar fecha y hora de salida
exports.almacenarSalida = async function ( id ){
    const pool = mariadb.createPool(conexion);
    let conn = await pool.getConnection();
    return await conn.query( consultas.almacenarSalida , [ horaActual() , id , fechaActual() ,  ] )
        .then( res => { 
            pool.end();
            return { insercion : true } 
        })
        .catch(error => { 
            pool.end();
            return { insercion : false } 
        });
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
    const pool = mariadb.createPool(conexion);
    let conn = await pool.getConnection();
    return await conn.query( consultas.datosSalaVideollama , [ id ] )
        .then( res => {
            pool.end();
            return res
        })
        .catch(error => { 
            pool.end();
            return [] 
        });
}

// Funcion para colocar datos a la consulta de insercion
function convertirConsulta( consulta , datos ){
    Object.keys(datos).forEach( x => {
        consulta = consulta.replace( `{{${x}}}` , datos[x] );
    });
    return consulta;
}