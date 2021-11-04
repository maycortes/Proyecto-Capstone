import QrScanner from "../node_modules/qr-scanner/qr-scanner.min.js";
QrScanner.WORKER_PATH = '../node_modules/qr-scanner/qr-scanner-worker.min.js';

const video = document.getElementById('qr-video');
const camList = document.getElementById('cam-list');
const camQrResult = document.getElementById('cam-qr-result');

const scanner = new QrScanner(video, result => {
        camQrResult.textContent = result;
        scanner.stop();
    }, error => {
    camQrResult.textContent = error;
});

scanner.start().then(() => {
    QrScanner.listCameras(true).then(cameras => cameras.forEach(camera => {
        const option = document.createElement('option');
        option.value = camera.id;
        option.text = camera.label;
        camList.add(option);
    }));
    let lector = document.getElementById("Seccion-Lector");
    lector.appendChild( scanner.$canvas );
});

// for debugging
window.scanner = scanner;

camList.addEventListener('change', event => {
    scanner.setCamera(event.target.value);
});