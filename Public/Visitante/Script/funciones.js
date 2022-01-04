
import { socket } from './identificadores.js'
import * as ids from './identificadores.js'

export function recibirDatos ( respuesta ) {
    if( respuesta.acceso ){
        let datosSala = document.getElementById('datosSala');
        datosSala.action = respuesta.data[ 'url' ];
        for( let i = 0 ; i < datosSala.elements.length ; i++ ){
            datosSala.elements[i].value = respuesta.data[ datosSala.elements[i].name ] 
        }
        datosSala.submit();
    }else{
        ids.contenedor_mensaje_espera.style.display = "none";
        ids.contenedor_mensaje_denegado.style.display = null;
        ids.contenedor_mensaje_aviso.innerText = respuesta.data;
        setTimeout( ()=> {
            ids.contenedor_camara.style.display = null;
            ids.contenedor_mensaje_denegado.style.display = 'none';
            scanner.start();
        }, 5000);
    }
}

// funcion para verificar el acceso
export function crearSala(dataQR){
    try {
        let codigoQR = JSON.parse( dataQR );
        if( codigoQR.hasOwnProperty('id') && codigoQR.hasOwnProperty('codigo') ){
            ids.contenedor_camara.style.display = 'none';
            ids.contenedor_mensaje_espera.style.display = null;
            socket.emit( 'nuevaSala' , codigoQR );
        }else{
            mostrarMensajeAccesoDenegado( "El codigo QR no pertenece a este sistema o no esta registrado");
            
        }
    } catch (error) {
        mostrarMensajeAccesoDenegado("El codigo QR no pertenece a este sistema o no esta registrado");

    }
}

export function mostrarMensajeAccesoDenegado( msg ){
    ids.contenedor_camara.style.display = 'none';
    ids.contenedor_mensaje_denegado.style.display = null;
    ids.contenedor_mensaje_aviso.innerText = msg;
    setTimeout( ()=> {
        ids.contenedor_camara.style.display = null;
        ids.contenedor_mensaje_denegado.style.display = 'none';
        scanner.start();
    }, 5000);
}