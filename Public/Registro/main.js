let PaginaRegistro = document.getElementById("PaginaRegistro");
let PaginaMostrar = document.getElementById("PaginaMostrar");

document.getElementById("Registrar").onclick = () => {
    PaginaRegistro.style.display = null;
    PaginaMostrar.style.display = "none";
}

document.getElementById("Mostrar").onclick = () => {
    PaginaMostrar.style.display = null;
    PaginaRegistro.style.display = "none";
}
/************************************************************************** */
document.getElementById("btn").onclick = function () {
    var xhr = new XMLHttpRequest();
    xhr.open('POST','https://192.168.1.67:3000/CrearPDF',false);
    xhr.setRequestHeader("Content-type","application/json");
    xhr.onload = function (){
        if(xhr.status == 200){
            //MostrarDocumentoPDF( JSON.parse(xhr.responseText) );
            alert( `El archivo PDF fue creado con el nombre ${JSON.parse(xhr.responseText).nombrePDF}` );
        }else{
            alert( "Ocurrio un error" );
        }
    }
    xhr.send( JSON.stringify( obtenerDatos() ) );
}

function obtenerDatos(){
    let datos = {};
    let nombreInputs = [ 
        "nombreFamiliar" , "apellido1Familiar" , "apellido2Familiar" , "telefono1" , "telefono2" , "correo" , "direccion" ,
        "nombrePaciente" , "apellido1Paciente" , "apellido2Paciente" , "NSS"
    ];
    nombreInputs.forEach( (x) => {
        datos[x] = document.getElementById(x).value;
    });
    return datos;
}

let archivoPDF;

/******************************************************************** */
document.getElementById("Buscar").onclick = () => {
    let buscarPDF = document.getElementById("buscarPDF").value;
    archivoPDF = document.createElement("embed");
    archivoPDF.type = "application/pdf";
    archivoPDF.src = "/" + buscarPDF + ".pdf";
    archivoPDF.style.width = "70%";
    archivoPDF.style.height = "400px";
    PaginaMostrar.appendChild(archivoPDF);
    document.getElementById("buscarPDF").value = "";
}
/*********************************************************************** */
document.getElementById("Limpiar").onclick = () => {
    PaginaMostrar.removeChild( archivoPDF );
    archivoPDF = null;
};
/*********************************************************************** */