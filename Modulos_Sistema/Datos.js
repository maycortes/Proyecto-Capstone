const {fs,path} = require('./Dependencias');

// Datos para la conexion con la BD
exports.conexion = {
    host     : '192.168.1.67',
    user     : 'JoseEduardo',
    password : 'eduardo112233',
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
