// Se importa los identificadores de los botones
import { btnEnviar , btnMostrar , btnLimpiar } from './identificadores.js';
// Se importa las funcionaes para los botones
import { crearArchivoPDF , buscarArchivoPDF } from './funciones.js'

// Evento para el boton enviar formulario de usuario a servidor
btnEnviar.addEventListener( 'click' ,  crearArchivoPDF );

btnMostrar.addEventListener( 'click' , buscarArchivoPDF );

btnLimpiar.addEventListener( 'click' , () => {
    alert( 'Presionaste Limpiar' );
});