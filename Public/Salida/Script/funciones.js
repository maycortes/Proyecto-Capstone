// funcion para verificar el acceso
// export function obtenerAcceso(dataQR){
//     dataQR.acceso = "Salida"; 
//     let url = '../ControlAcceso';
//     fetch(url, { method: 'POST', body: JSON.stringify(dataQR) , headers:{'Content-Type': 'application/json' } })
//         .then(res => res.json() )
//         .then( res => mostrarMensaje( res ) )
//         .catch(error => console.error('Error:', error));
// }

import QrScanner from '/ModuloScannerQR/qr-scanner.min.js'
QrScanner.WORKER_PATH = '/ModuloScannerQR/qr-scanner-worker.min.js'

import * as ids from './identificadores.js'

// Declaracion de la variable scanner para crear una nueva QrScanner
const scanner = new QrScanner( ids.video , result => {
    solicitarAcceso( result );
    scanner.stop();
    ids.contenedor_camara.style.display = 'none';
}, error => {
    console.log( error );
});

scanner.start().then(() => {
    QrScanner.listCameras(true).then(cameras => cameras.forEach( camera => {
        const option = document.createElement('option');
        option.value = camera.id;
        option.text = camera.label;
        ids.camList.add(option);
    }));
    document.getElementById("Lector").appendChild( scanner.$canvas );
});

// funcion para agregar las camaras del dispositivo en el selector
export function agregarOpcionesCamaras(e){
    scanner.setCamera(e.target.value);
}

// Funcion para solicitar acceso
function solicitarAcceso( data ){
    try {
        let codigoQR = JSON.parse( data );
        if( codigoQR.hasOwnProperty('id') && codigoQR.hasOwnProperty('codigo') ){
            fetch( '../ControlAccesoSalida' , { method: 'POST', body: data , headers:{'Content-Type':'application/json'} })
            .then(res => res.json() )
            .then( res => mostrarMensaje( res ) )
            .catch(error => console.error('Error:', error));
        }else{
            mostrarMensaje( { acceso : false , data : "El codigo QR no pertenece a este sistema o no esta registrado" } );
        }
    } catch (error) {
        mostrarMensaje( { acceso : false , data : "El codigo QR no pertenece a este sistema o no esta registrado" } );
    }
}

// Funcion para mostrar el mensaje (Acceso Permitido o Denegado)
function mostrarMensaje( res ){
    if( res.acceso ){
        ids.nombre_visitante.innerText = res.data.nombreVis + " " + res.data.apellido1Vis + " " + res.data.apellido2Vis;
        ids.contenedor_acceso_permitido.style.display = null;
        setTimeout( ()=> {
            ids.contenedor_camara.style.display = null;
            ids.contenedor_acceso_permitido.style.display = 'none';
            scanner.start();
        }, 5000);
    }else{
        ids.contenedor_acceso_denegado.style.display = null;
        ids.mensaje_aviso.innerText = res.data;
        setTimeout( ()=> {
            ids.contenedor_camara.style.display = null;
            ids.contenedor_acceso_denegado.style.display = 'none';
            scanner.start();
        }, 5000);
    }
}

// Inicia el scanner al iniciar la pagina
window.scanner = scanner;