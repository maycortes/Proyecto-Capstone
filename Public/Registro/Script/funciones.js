import * as ids from './identificadores.js'

// Funciones para los Botones (cambiar de seccion)
export function mostrarSeccion(e){
    ids.seccion_almacenador.style.display = ( e.target.id == 'Btn_Almacenado' ) ? null : 'none';
    ids.seccion_visualziador.style.display = ( e.target.id == 'Btn_Visualizador' ) ? null : 'none';
}

export function obtenerPDFAlmacenado(){
    let data = { "nombrePDF" : ids.input_visualizador.value };
    fetch( '../MostrarPDF' , { method: 'POST', body: JSON.stringify(data), headers:{'Content-Type': 'application/json' } })
        .then(res => res.json() )
        .then( res => mostrarArchivoPDF( res ) )
        .catch(error => console.error('Error:', error));
}

export function limpiarSeccionVisualizador(){
    ids.input_visualizador.value = "";
    ids.input_visualizador.labels[0].className = 'titulo_label_abajo';
    limpiarVisualizador();
}

// Funciones para los labels
export function moverLabel(e){
    e.target.labels[0].className = ( e.target.value == "" ) ? 'titulo_label_abajo' : 'titulo_label_arriba';
}

// funciones para el boton enviar formulario
export function enviarFormularioUsuario(){
    let data = {};
    for (let i = 0; i < 13; i++) {
        data[ ids.seccion_almacenador[ i ].name ] = ids.seccion_almacenador[ i ].value;
    }
    fetch('../CrearPDF', { method: 'POST', body: JSON.stringify(data), headers:{'Content-Type': 'application/json' } })
        .then( res => res.json() )
        .then( res => { limpiarEntradasInputsAlmacenador(); mostrarArchivoPDF( res ); })
        .catch(error => console.error('Error:', error))
}

/********** Funciones no eportadas **************************************************************/
// Objeto para mostrar el archivo PDF
let archivoPDF = null;

function mostrarArchivoPDF( res ){
    if( res.existencia ){
        limpiarVisualizador();
        cambiarSeccion();
        archivoPDF = document.createElement("object");
        archivoPDF.data = "data:application/pdf;base64," + res.archivo;
        archivoPDF.style.width = "100%";
        archivoPDF.style.height = "100%";
        archivoPDF.type="application/pdf";
        ids.contenedor_visualizador.appendChild( archivoPDF );
    }else{
        alert( "No existe el documento PDF" );
    }
}

function limpiarVisualizador(){
    if( archivoPDF != null ){
        ids.contenedor_visualizador.removeChild( archivoPDF );
        archivoPDF = null;
    }
}

function cambiarSeccion() {
    ids.seccion_almacenador.style.display = 'none';
    ids.seccion_visualziador.style.display = null;
}

function limpiarEntradasInputsAlmacenador(){
    for (let i = 0; i < 13; i++) {
        ids.seccion_almacenador[ i ].value = "";
        ids.seccion_almacenador[ i ].labels[0].className = 'titulo_label_abajo';
    }
}