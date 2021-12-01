// Modulo local Dependencias.js
const { path , fs } = require('./Dependencias.js');
// Modulo local Consultas.js
const ConsultasSQL = require("./ConsultasSQL");
// Modulo local informacionBD
const { codigo } = require('./BD/informacionBD');
// Modulo local GenerarPDF
const {crearArchivoPDF} = require('./GenerarPDF');

/*################################################################################################## */
// Funcion que pemrite mostrar la pagina de Registro
function mostrarRegistro( req , res) {
    let dato = req.body;
    if ( dato.codigo == codigo ) {
        res.sendFile( path.join(process.cwd(),'Public','Registro','index.html') );
    }else{
        res.send( "acceso denegado" );
    }
}
// Funcion que permite mostrar la pagina Entarda
function mostrarEntrada( req , res ){
    let dato = req.body;
    if ( dato.codigo == codigo ) {
        res.sendFile( path.join(process.cwd(),'Public','Entrada','index.html') );
    }else{
        res.send( "acceso denegado" );
    }
}
// Funcion que permite mostrar la pagina Salida
function mostrarSalida( req , res ){
    let dato = req.body;
    if ( dato.codigo == codigo ) {
        res.sendFile( path.join(process.cwd(),'Public','Salida','index.html') );
    }else{
        res.send( "acceso denegado" );
    }
}

/*################################################################################################## */
// Funcion que permite indicar si se tiene acceso a las paginas Registro, Entrada, Salida, Visitante y Paciente
function permitirAccesoPaginas( req , res ){
    ConsultasSQL.obtenerAcceso( req.body ).then( ( {acceso , seccion} ) => {
        if( acceso ){
            if( seccion==1 ) res.end( JSON.stringify( {acceso:true , url:"../Registro",codigo:codigo} ));
            else if( seccion==2 ) res.end(JSON.stringify( {acceso:true,url:"../Entrada",codigo:codigo} ));
            else if( seccion==3 ) res.end(JSON.stringify( {acceso:true,url:"../Salida",codigo:codigo} ));
            else if( seccion==4 ) res.end(JSON.stringify( {acceso:true,url:"../Visitante",codigo:codigo} ));
            else if( seccion==5 ) res.end(JSON.stringify( {acceso:true,url:"../Paciente",codigo:codigo} ));
        }else{
            res.end( JSON.stringify( { acceso : false} ) );
        }
    })
}
// Numero de visitantes dentro del hopital
let numeroVisitantes = 3;
// Funcion que permite indicar el control de acceso
async function controlAcceso( req , res ){
    try {
        let tipoAcceso = req.body.acceso;
        let consulta = await ConsultasSQL.consultarUsuario( req.body.id );
        if( consulta.length > 0 ){
            if( tipoAcceso == "Entrada" ){
                let entrada = await ConsultasSQL.consultarEntrada( req.body.id );
                if( entrada.length <= 0 && numeroVisitantes > 0 ){
                    let {insercion} = await ConsultasSQL.almacenarEntrada( req.body.id );
                    --numeroVisitantes;
                    res.send( JSON.stringify( insercion ? { acceso : true , data : consulta[0] } : { acceso : false } ) );
                    return;
                }
            }
            if( tipoAcceso == "Salida" ){
                let salida = await ConsultasSQL.consultarSalida( req.body.id );
                if ( salida.length == 1 ) {
                    let {insercion} = await ConsultasSQL.almacenarSalida( req.body.id );
                    ++numeroVisitantes;
                    res.send( JSON.stringify( insercion ? { acceso : true , data : consulta[0] } : { acceso : false } ) );
                    return;
                }
            }
        }
        res.send( JSON.stringify( { acceso : false } ) );
    } catch (error) {
        console.log(error);
        res.send( JSON.stringify( { acceso : false } ) );
    }
}
// Funcion que permite crear un archivo PDF
async function crearPDF(req, res){
    try {
        let {insercion,id} = await ConsultasSQL.almacenarUsuario( req.body );
        if( insercion ){
            let {creado,pdf} = await crearArchivoPDF( req.body , {id:id,codigo:codigo} );
            res.send(JSON.stringify( creado ? PDFBase64( pdf ) : {existencia:false} ));
        }else{
            res.send(JSON.stringify( {existencia:false} ));
        }
    } catch (error) {
        res.send(JSON.stringify( {existencia:false} ));
    }
}
// Funcion que permite mostrar un archivo PDF
function mostrarPDF(req, res) {
    res.send(JSON.stringify( PDFBase64(req.body.nombrePDF) ));
}

/*################################################################################################## */
// Obtiene un PDF y los datos del archivo los convierte en Base64 
function PDFBase64( nombrePDF ){
    let direccion = path.join(process.cwd(),'Documentos_PDF',`${nombrePDF}.pdf`);
    if(fs.existsSync(direccion)) {
        var data = fs.readFileSync(direccion,'base64');
        return {existencia:true,archivo:data};
    }else{
        return {existencia:false};
    }
}

module.exports = {
    permitirAccesoPaginas , 
    mostrarRegistro , 
    crearPDF , 
    mostrarPDF , 
    mostrarEntrada , 
    mostrarSalida , 
    controlAcceso 
}