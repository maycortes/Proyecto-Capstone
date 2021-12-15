// Modulo local que contiene funciones
import {CrearDatosSala, CrearFormulario, verificarNumeroSalas} from './funciones.js';

/*********Implementacion de SocketIO para la comunicacion con el serviodor************** */

// Se inicia conexion al servidor socket
const socket = io();
// Evento que se inicia al entrar a la pagina y solicita las salas anteriores
socket.on( 'connect' , () => {
	socket.emit( 'solocitarSalas', );
});
// Evento que obtiene las salas anteriores y llama a la funcion pintar datos
socket.on( 'salasPrevias' , (salasPrevias) => {
	for( let x of salasPrevias ){
		pintarDatos(x);
    verificarNumeroSalas();
	}
});
// Evento que obtiene las nuevas salas que se esten creando en tiempo real
socket.on( 'agregarSala' , (datos) => {
  pintarDatos( datos );
  verificarNumeroSalas();
});
// Evento que obtiene las nuevas salas que se esten creando en tiempo real
socket.on( 'borrarSala' , (url) => {
  console.log( url );
  let Inicio = document.getElementById('Inicio');
  let sala = document.getElementById(url);
  Inicio.removeChild(sala);
  verificarNumeroSalas();
});

/********Indicaciones para el funcionamiento de la pagina*******************************************/

// Funcion que permite mostrar las salas creadas 
function pintarDatos( datos ){
  	// Contenedor de la sala con identificador datos.numeroExpediente
	let Sala = document.createElement("div");
  /* Se crea contenido */
  let boton = CrearDatosSala(Sala,datos);
  // Se agrega una funcion para el boton
  boton.onclick = function(){
    socket.emit( 'comprobarSala' , datos.url);
    // Evento que permite iniciar la video llamada
    socket.on( 'recibirAutorizacion' , (autorizacion) => {
      if(autorizacion){
        CrearFormulario( datos );
      }else{
        alert("La sala ya esta llena, compruebe que la sala sea la correcta o espere a que se desocupe");
      }
    });
  }   
}
