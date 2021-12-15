// Modulo de dependecias
const { fs , path , pdf } = require('../Dependencias');
// Modulo para convertir collback a promesas
const {promisify} = require('util');
// Modulo generar QR
const {GenerarCodigoQR} = require('../QR/main');

// Funcion que permite crear un PDF
exports.crearArchivoPDF = async function ( datos , usuario ){
    // Variable que almacena los datos de la pagina HTML
    let html = fs.readFileSync( path.join( __dirname , "index.html" ) , 'utf8');
    // Se combierte una imagen en base 64
    let imgIMSS = fs.readFileSync( path.join( __dirname , "imss.png" ) , 'base64' );
    // Carga la iamgen en el documento
    html = html.replace( "{{imss}}" , imgIMSS );
    // Coloca los datos obtenidos
    Object.keys( datos ).forEach( x => {
        html = html.replace( `{{${x}}}` , datos[x] );
    });
    // Agrega el codigo QR y crea el archivo PDF
    try {
        let codigoQR = await GenerarCodigoQR(JSON.stringify( usuario ));
        html = html.replace( "{{QR}}" , codigoQR );
        let doc = pdf.create( html , { format: 'Letter' } );
        doc.toFile = promisify( doc.toFile );
        let direccion = await doc.toFile(`./Documentos_PDF/${datos['nss']}.pdf`);
        return { creado : true , direccion : direccion , pdf : datos['nss'] };
    } catch (error) {
        return { creado : false }
    }
}
