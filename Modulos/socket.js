//Módulo local Servidorvidor.js
const Servidor = require('./servidor.js');

//Módulo local Funciones.js
const Funcion = require('./funciones.js');

//Módulo SocketIO que permite crear aplicaciones web en tiempo real.
//Permite la comunicación bidireccional en tiempo real entre el cliente y el Servidorvidor web.
const SocketIO = require('socket.io');

//Implementacion de SocketIO en el Servidorvidor
const io = SocketIO(Servidor.server);

let Salas = [];

io.on('connection' , (socket) => {

	/**************Eventos para el Familiar***************************/
	//Evento Solicitar URL que crea y envia la url de la sala al Familiar
	socket.on( 'solicitarURL' , () => {
		socket.emit('recibirURL' , `https://${Servidor.direccionIP}:${Servidor.puerto}/` + Funcion.generarURL() );
	});

	/***************Eventos para el Paciente************************/
	// Evento que envia las salas que se crearon antes de la conexion del Paciente
	socket.on( 'solocitarSalas' , () => {
		socket.emit('salasPrevias' , Salas );
	});
	// Evento que escucha cuando se crea una nueva sala y la envia al Paciente
	socket.on( 'nuevaSala' , (datos) => {
		Salas.push( datos );                         // Se guarda la sala 
		io.sockets.emit( 'agregarSala' , datos );	 // Se envia la nueva sala a todos los Pacientes
	});
	// Evento que verifica si se puede acceder a la sala
	socket.on( 'comprobarSala' , (url) => {
		 let usuarios = io.sockets.adapter.rooms.get(url);
		 let numUsuarios = usuarios ? usuarios.size : 0;
		if( numUsuarios < 2 ){
			socket.emit( 'recibirAutorizacion' , true );
		}else{
			socket.emit( 'recibirAutorizacion' , false );
		}
	});

	/****************Eventos para la Sala*******************************/
	// Variable que indica si esta en la sala de videoconferencia
	let indicadorSala = false;
	// Variable que indica en que sala se encuentra
	let sala = null;
	//Evento que permite unir al [ Paciente | Familiar ] a sala mediante la url y si existen 2 clientes conectados emite su id
	socket.on( 'unirseSala' , (url,indicador) => {
		indicadorSala = indicador;
		sala = url;
		socket.join(url);
		let usuarios = io.sockets.adapter.rooms.get(url);
	      usuarios.forEach(( x ) => {
	          if( x != socket.id ){
	              socket.emit('other-users',x);
	          }
	      });
	});
	// Enviar oferta para iniciar la conexión
    socket.on('offer', (socketId, description) => {
      socket.to(socketId).emit('offer', socket.id, description);
    });
    // Enviar respuesta de solicitud de oferta
    socket.on('answer', (socketId, description) => {
      socket.to(socketId).emit('answer', description);
    });
    // Enviar señales para establecer el canal de comunicación
    socket.on('candidate', (socketId, candidate) => {
      socket.to(socketId).emit('candidate', candidate);
    });
	// Evento que se inicia al entrar a la pagina y solicita las salas anteriores
	socket.on( 'disconnect' , () => {
		if( indicadorSala & io.sockets.adapter.rooms.get(sala) == undefined){
			let numeroExpediente;
			Salas = Salas.filter( (x) => {
				if(x.url == sala){
					numeroExpediente = x.numeroExpediente;
					return false;
				}
				return true;
			});
			io.sockets.emit('borrarSala' , numeroExpediente );
		}
	});

});