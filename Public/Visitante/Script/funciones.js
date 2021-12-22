const socket = io('/');

socket.on( 'recibirDatos' , ( respuesta ) => {
    if( respuesta.acceso ){
        let datosSala = document.getElementById('datosSala');
        datosSala.action = respuesta.data[ 'url' ];
        for( let i = 0 ; i < datosSala.elements.length ; i++ ){
            datosSala.elements[i].value = respuesta.data[ datosSala.elements[i].name ] 
        }
        datosSala.submit();
    }else{
        alert( respuesta.data );
    }
});

// funcion para verificar el acceso
export function crearSala(dataQR){
    socket.emit( 'nuevaSala' , dataQR );
}

// Mostrar el resultado del servidoe
export function mostrarMensaje(resultado) {
    console.log( resultado );
}