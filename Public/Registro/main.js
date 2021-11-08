let paginaRegistrar = document.getElementById("Pagina_Registrar");
let paginaVisualizar = document.getElementById("Pagina_Visualizar");

document.getElementById("Registrar").onclick = function(){
    paginaRegistrar.style.display = null;
    paginaVisualizar.style.display = "none";
    LimpiarVisualizador();
}

document.getElementById("Visualizar").onclick = function(){
    paginaRegistrar.style.display = "none";
    paginaVisualizar.style.display = null;
}
/***************************************************** */
let nombrePDF = document.getElementById("nombrePDF");
let visualizador = document.getElementById("Seccion_Documento_PDF");
let archivoPDF = null;

document.getElementById("Buscar").onclick = function(){
    if( nombrePDF.value != "" ){
       MostrarArchivo( nombrePDF.value );
       nombrePDF.value = "";
    }else{
        alert( "¡Escribe el nombre del PDF!" );
    }
}
/***************************************************** */
document.getElementById("Limpiar").onclick = LimpiarVisualizador;

function LimpiarVisualizador(){
    if( archivoPDF != null ){
        visualizador.removeChild( archivoPDF );
        archivoPDF = null;
        nombrePDF.value = "";
    }
}

function LimpiarInputs(){
    let nombreInputs = [
        "nombreF" , "apellido1F" , "apellido2F" , "telefono1" , "telefono2" , "correo" , "direccion",
        "nombreP" , "apellido1P" , "apellido2P" , "NSS" , "numeroCama" , "numeroPiso"
    ];
    nombreInputs.forEach( x => {
        document.getElementById(x).value = "";
    });
}

function MostrarArchivo( nombreArchivo ){
    let url = 'https://192.168.1.67:3000/MostrarPDF';
    let data = { "nombrePDF" : nombreArchivo };
    fetch(url, {
        method: 'POST',
        body: JSON.stringify(data),
        headers:{'Content-Type': 'application/json'
        }
      }).then(res => res.json() )
      .catch(error => console.error('Error:', error))
      .then( dato => {
        archivoPDF = document.createElement("object");
        archivoPDF.data = "data:application/pdf;base64," + dato.dato;
        archivoPDF.type="application/pdf";
        archivoPDF.style.width = "100%";
        archivoPDF.style.height = "100%";
        visualizador.appendChild( archivoPDF );
      });
}
/*************************************************************************** */
let Enviar = document.getElementById("Enviar");
let mensajeEspera = document.getElementById("Mensaje_Espera");
Enviar.onclick = function(){
    Enviar.style.display = "none";
    mensajeEspera.style.display = null;
    let url = 'https://192.168.1.67:3000/CrearPDF';
    let data = obtenerDatos();
    fetch(url, {
        method: 'POST',
        body: JSON.stringify(data),
        headers:{'Content-Type': 'application/json'
        }
      }).then(res => res.json() )
      .catch(error => console.error('Error:', error))
      .then( dato => {
        console.log( dato.nombrePDF );
        Enviar.style.display = null;
        mensajeEspera.style.display = "none";
        paginaRegistrar.style.display = "none";
        paginaVisualizar.style.display = null;
        nombrePDF.value = dato.nombrePDF;
      });
}

function obtenerDatos(){
    let nombreInputs = [
        "nombreF" , "apellido1F" , "apellido2F" , "telefono1" , "telefono2" , "correo" , "direccion",
        "nombreP" , "apellido1P" , "apellido2P" , "NSS" , "numeroCama" , "numeroPiso"
    ];
    let datos = {};
    nombreInputs.forEach( x => {
        datos[x] = document.getElementById(x).value;
    });
    LimpiarInputs();
    return datos;
}