import QrScanner from "/ModuloScannerQR/qr-scanner.min.js";
QrScanner.WORKER_PATH = '/ModuloScannerQR/qr-scanner-worker.min.js';

import * as ids from './identificadores.js'
import * as funciones from './funciones.js'

const scanner = new QrScanner(ids.video, result => {
    funciones.crearSala( result );
    scanner.stop();
}, error => {
    console.log( error );
});

scanner.start().then(() => {
    QrScanner.listCameras(true).then(cameras => cameras.forEach(camera => {
        const option = document.createElement('option');
        option.value = camera.id;
        option.text = camera.label;
        ids.camList.add(option);
    }));
    document.getElementById("Lector").appendChild( scanner.$canvas );
});

// for debugging
window.scanner = scanner;

ids.camList.addEventListener('change', event => {
    scanner.setCamera(event.target.value);
});

ids.socket.on( 'recibirDatos' , funciones.recibirDatos );