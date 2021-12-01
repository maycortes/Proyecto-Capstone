import QrScanner from "/ModuloScannerQR/qr-scanner.min.js";
QrScanner.WORKER_PATH = '/ModuloScannerQR/qr-scanner-worker.min.js';

import { obtenerAcceso } from '/ScriptSalida/funciones.js'

const video = document.getElementById('qr-video');
const camList = document.getElementById('cam-list');

const scanner = new QrScanner(video, result => {
    obtenerAcceso( JSON.parse(result) );
    scanner.stop();
    setTimeout( () => scanner.start() , 5000 );
}, error => {
    console.log( error );
});

scanner.start().then(() => {
    QrScanner.listCameras(true).then(cameras => cameras.forEach(camera => {
        const option = document.createElement('option');
        option.value = camera.id;
        option.text = camera.label;
        camList.add(option);
    }));
    let lector = document.getElementById("Lector");
    lector.appendChild( scanner.$canvas );
});

// for debugging
window.scanner = scanner;

camList.addEventListener('change', event => {
    scanner.setCamera(event.target.value);
});