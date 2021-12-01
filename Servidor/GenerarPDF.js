// Modulo de dependecias
const { fs , path } = require('./Dependencias');
// Permite crear un PDF a partir de una pagina HTML
const pdf = require('html-pdf');
// Modulo para convertir collback a promesas
const {promisify} = require('util');
// Modulo generar QR
const {GenerarCodigoQR} = require('./GenerarQR');

// Funcion que permite crear un PDF
async function crearArchivoPDF ( datos , usuario ){
    // Variable que almacena los datos de la pagina HTML
    let html = fs.readFileSync( path.join( __dirname , "PDF" , "index.html" ) , 'utf8');
    // Se combierte una imagen en base 64
    let imgIMSS = fs.readFileSync( path.join( __dirname , "PDF" , "imss.png" ) , 'base64' );
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
        console.log( error );
        return { creado : false }
    }
}

module.exports = {
    crearArchivoPDF
};