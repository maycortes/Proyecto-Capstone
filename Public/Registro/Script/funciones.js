// Se importa los identificadores
import {UsuarioFormulario,ArchivoFormulario,Visualizador} from './identificadores.js'

// Objeto para mostrar el archivo PDF
let archivoPDF = null;

/*#################################################################################################################*/
// Funciones exportadas

// Funcion para enviar los datos del formulario usuario
export function crearArchivoPDF(){
    let elements = UsuarioFormulario.elements;
    let data = {};
    for (let i = 0; i < elements.length-1; i++) {
        data[ UsuarioFormulario[ i ].name ] = UsuarioFormulario[ i ].value;
    }
    let url = '../CrearPDF';
    fetch(url, { method: 'POST', body: JSON.stringify(data), headers:{'Content-Type': 'application/json' } })
        .then( res => res.json() )
        .then( res => mostrarArchivoPDF( res ) )
        .catch(error => console.error('Error:', error))
}

// Funcion para buscar el archivo PDF
export function buscarArchivoPDF(){
    let url = '../MostrarPDF';
    let data = { "nombrePDF" : ArchivoFormulario[0].value };
    fetch(url, { method: 'POST', body: JSON.stringify(data), headers:{'Content-Type': 'application/json' } })
        .then(res => res.json() )
        .then( res => mostrarArchivoPDF( res ) )
        .catch(error => console.error('Error:', error));
}

/*#################################################################################################################*/
// Funciones no exportadas (se utilizan solo en este archivo JS)

export function mostrarArchivoPDF( res ){
    if( res.existencia ){
        limpiarVisualizador();
        archivoPDF = document.createElement("object");
        archivoPDF.data = "data:application/pdf;base64," + res.archivo;
        archivoPDF.style.width = "100%";
        archivoPDF.style.height = "400px";
        archivoPDF.type="application/pdf";
        Visualizador.appendChild( archivoPDF );
    }else{
        alert( "No existe el documento PDF" );
    }
}

export function limpiarVisualizador(){
    if( archivoPDF != null ){
        Visualizador.removeChild( archivoPDF );
        archivoPDF = null;
    }
}
