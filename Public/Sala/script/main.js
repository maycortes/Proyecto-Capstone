import { videoLocal } from './identificadores.js';
import {iniciarConexion} from './conexionwebrtc.js';

// Abrir la capara para capturar audio y video
navigator.mediaDevices.getUserMedia({ video: true, audio: true }).then(stream => {
    // Mostrar mi Video
    videoLocal.srcObject = stream;
    // Inicie una conexión de pares para transmitir la transmisión
    iniciarConexion(stream);
}).catch(error => console.log(error));