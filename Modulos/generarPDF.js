// Modulo de dependecias
const Dep = require('./dependencias.js');

// Permite crear un PDF a partir de una pagina HTML
const pdf = require('html-pdf');

// Modulo generar QR
const generarQR = require('./generarQR');

const nombreDatos = [ 
    "nombreF" , "apellido1F" , "apellido2F" , "telefono1" , "telefono2" , "correo" , "direccion",
    "nombreP" , "apellido1P" , "apellido2P" , "NSS" , "numeroCama" , "numeroPiso"
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

    try {
        let codigoQR = await generarQR.GenerarQR(agregar);
        html = html.replace( "{{QR}}" , codigoQR );
        await pdf.create( html , { format: 'Letter' } ).toFile('./Documentos_PDF/' + datos["NSS"] + ".pdf", (err,res) => {
            console.log( err ? err : res );
        });
        return datos["NSS"];
    } catch (error) {
        console.log( error );
    }
}
