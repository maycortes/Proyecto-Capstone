//Módulo local Servidorvidor.js
const { server } = require('../Servidor/main');
//Módulo local Funciones.js
const { generarURL , generarDatosPaciente , generarDatosVisitante } = require('./Funciones');
//Modulo local ConsultasSQL.js
const {datosSalaVideollama} = require('../BD/main');
//Módulo SocketIO que permite crear aplicaciones web en tiempo real.
//Permite la comunicación bidireccional en tiempo real entre el cliente y el Servidorvidor web.
const SocketIO = require('socket.io');

//Implementacion de SocketIO en el Servidor
const io = SocketIO(server);

let Salas = [];

io.on('connection' , (socket) => {

	/**************Eventos para el Familiar***************************/
	// Evento que escucha cuando se crea una nueva sala y la envia al Paciente
	socket.on( 'nuevaSala' , async (datos) => {
		if( datos.codigo == 'uam' ){
			let consulta = await datosSalaVideollama(datos.id);
			if( consulta.length > 0 ){
				let urlSala = generarURL();
				let Sala = generarDatosPaciente( consulta[0] , urlSala );
				Salas.push( Sala );
				io.sockets.emit( 'agregarSala' , Sala );
				socket.emit('recibirDatos' , {  acceso : true , data : generarDatosVisitante( consulta[0] , urlSala ) } );
			}else{
				socket.emit('recibirDatos' , { acceso : false , data : "Codigo QR no valido"} );
			}
		}else{
			socket.emit('recibirDatos' , { acceso : false , data : "Codigo QR no valido"} );
		}
	});

	/***************Eventos para el Paciente************************/
	// Evento que envia las salas que se crearon antes de la conexion del Paciente
	socket.on( 'solocitarSalas' , () => {
		socket.emit('salasPrevias' , Salas );
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
			let nss;
			Salas = Salas.filter( (x) => {
				if(x.url == sala){
					nss = x.nss;
					return false;
				}
				return true;
			});
			io.sockets.emit('borrarSala' , nss );
		}
	});

});