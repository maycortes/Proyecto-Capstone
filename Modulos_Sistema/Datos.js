const {fs,path} = require('./Dependencias');

// Datos para la conexion con la BD
exports.conexion = {
    host     : '192.168.1.75',
    user     : 'root',
    password : 'root',
    database : 'hospital'
}

// Codigo para accesar al servidor
exports.codeServer = 'uam';

// Puerto del Servidor
exports.puerto = 3000;

// Certificado SSL
exports.certificado = {
    cert : fs.readFileSync( path.join( __dirname , 'Servidor' , 'cert.pem' ) ),
    key : fs.readFileSync( path.join( __dirname , 'Servidor' , 'key.pem' ) )
}
