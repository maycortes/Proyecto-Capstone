// Modulo de dependecias
const Dep = require('./dependencias.js');

// Permite crear un PDF a partir de una pagina HTML
const pdf = require('html-pdf');

// Modulo generar QR
const generarQR = require('./generarQR');

const nombreDatos = [ 
    "nombreFamiliar" , "apellido1Familiar" , "apellido2Familiar" , "telefono1" , "telefono2" , "correo" , "direccion" ,
    "nombrePaciente" , "apellido1Paciente" , "apellido2Paciente" , "NSS"
];

// Funcion que permite crear un PDF
exports.crearPDF = async function ( datos ){

    // Variable que almacena los datos de la pagina HTML
    let html = Dep.fs.readFileSync( Dep.path.join( __dirname , "index.html" ) , 'utf8');
    // Se combierte una imagen en base 64
    let imgIMSS = Dep.fs.readFileSync( Dep.path.join( __dirname , "Imagenes" , "imss.png" ) , 'base64' );

    let agregar = "";

    html = html.replace( "{{imss}}" , imgIMSS );
    nombreDatos.forEach( ( x ) => {
        html = html.replace( `{{${x}}}` , datos[x] );
        agregar = agregar + datos[x] +",";
    });

    await generarQR.GenerarQR(agregar).then( (codigoQR) => {
        html = html.replace( "{{QR}}" , codigoQR );
        pdf.create( html , { format: 'Letter' } ).toFile('./Documentos_PDF/' + datos["NSS"] + ".pdf", (err,res) => {
            console.log( err ? err : res );
        });
    });
}
