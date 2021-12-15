import {entradaMensaje,videoRemoto,registrarMensaje,url, miNombre,familiarNombre,registrarAviso} from './identificadores.js';

export const iniciarConexion = (stream) => {
  const socket = io('/');
  let conexionLocal;
  let conexionRemata;
  let canalLocal;
  let canalRemoto;

  socket.on( 'connect' , () => {
  	socket.emit( 'unirseSala', url.value , true  );
  });

  // Inicie una RTCPeerConnection para cada cliente
  socket.on('other-users', (otrosUsuarios) => {
    // Ignorar cuando no exista otros usuarios conectados.

    //const socketId = otrosUsuarios[0];
	const socketId = otrosUsuarios;

    // Iniciar conexión entre pares
    conexionLocal = new RTCPeerConnection();

    // Agregar todas las pistas de la transmisión a la conexión entre pares
    stream.getTracks().forEach(track => conexionLocal.addTrack(track, stream));

    // Enviar candidatos para establecer un canal de comunicación para enviar flujo y datos
    conexionLocal.onicecandidate = ({ candidate }) => {
      candidate && socket.emit('candidate', socketId, candidate);
    };

    // Reciba la transmisión desde el cliente remoto y agregue al área de video remoto
    conexionLocal.ontrack = ({ streams: [ stream ] }) => {
      videoRemoto.srcObject = stream;
    };

    // Inicie el canal para charlar
    canalLocal = conexionLocal.createDataChannel('chat_channel');

    // Llamada a función que recibe un mensaje en el canal
    canalLocal.onmessage = (event) => registrarMensaje(`${event.data}`,"familiarMensaje", `${familiarNombre.value}`);
    // Function Called When Channel is Opened
    canalLocal.onopen = (event) => registrarAviso("Canal Abierto","SistemaAbierto");
    // Function Called When Channel is Closed
    canalLocal.onclose = (event) => registrarAviso("Canal Cerrado","SistemaCerrado");

    // Crear oferta, establecer descripción local y enviar oferta a otros usuarios conectados
    conexionLocal
      .createOffer()
      .then(offer => conexionLocal.setLocalDescription(offer))
      .then(() => {
        socket.emit('offer', socketId, conexionLocal.localDescription);
      });
  });

  // Recibir oferta de otro cliente
  socket.on('offer', (socketId, description) => {
    // Iniciar conexión entre pares
    conexionRemata = new RTCPeerConnection();

    // Add all tracks from stream to peer connection
    stream.getTracks().forEach(track => conexionRemata.addTrack(track, stream));

    // Agregar todas las pistas de la transmisión a la conexión entre pares
    conexionRemata.onicecandidate = ({ candidate }) => {
      candidate && socket.emit('candidate', socketId, candidate);
    };

    // Reciba la transmisión desde el cliente remoto y agregue al área de video remoto
    conexionRemata.ontrack = ({ streams: [ stream ] }) => {
      videoRemoto.srcObject = stream;
    };

    // Chanel recibido
    conexionRemata.ondatachannel = ({ channel }) => {
      // Store Channel
      canalRemoto = channel;

      // Llamada a funcion que recibe un mensaje en el canal
      canalRemoto.onmessage = (event) => registrarMensaje(`${event.data}`,"familiarMensaje", `${familiarNombre.value}`);
      // Función llamada cuando se abre el canal
      canalRemoto.onopen = (event) => registrarAviso("Canal Abierto","SistemaAbierto");
      // Función llamada cuando el canal está cerrado
      canalRemoto.onclose = (event) => registrarAviso("Canal Cerrado","SistemaCerrado");
    }

    // Establecer descripción local y remota y crear respuesta
    conexionRemata
      .setRemoteDescription(description)
      .then(() => conexionRemata.createAnswer())
      .then(answer => conexionRemata.setLocalDescription(answer))
      .then(() => {
        socket.emit('answer', socketId, conexionRemata.localDescription);
      });
  });

  // Recibir respuesta para establecer conexión entre pares
  socket.on('answer', (description) => {
    conexionLocal.setRemoteDescription(description);
  });

  // Reciba candidatos y agregue a la conexión entre pares
  socket.on('candidate', (candidate) => {
    // GET Conexión local o remota
    const conn = conexionLocal || conexionRemata;
    conn.addIceCandidate(new RTCIceCandidate(candidate));
  });

  entradaMensaje.addEventListener('keydown', inputCharacters);

  // Asigne el clic del botón de mensaje
  function inputCharacters(event) {
    if (event.keyCode == 13) {
      // GET mensaje de entrada
      const message = entradaMensaje.value;
      // Limpiar entrada
      entradaMensaje.value = '';
      // Mensaje de registro como enviado
      registrarMensaje(`${message}`,"miMensaje", `${miNombre.value}`);

      // GET el canal (puede ser local o remoto)
      const channel = canalLocal || canalRemoto;
      // Enviar mensaje. El otro cliente recibirá este mensaje en la función 'onmessage' del canal
      channel.send(message);
    }
  }
}