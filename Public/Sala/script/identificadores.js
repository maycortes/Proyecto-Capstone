//Identificadores de elementos HTML
const mensajes = document.getElementById('Mensajes');

export const entradaMensaje = document.getElementById('entrada-mensaje');
export const videoLocal = document.getElementById('video-local');
export const videoRemoto = document.getElementById('video-remoto');

export const registrarMensaje = (msg,clase,nombrePersona) => {
  let contenedorMensaje = document.createElement("div");
  contenedorMensaje.className = `ContenedorMsg ${clase}`;
  let etiquetas = [ ["NombreMensaje", nombrePersona ] , ["DatoMensaje" , msg] ];
  for(let x of etiquetas){
    let div = document.createElement("div");
    div.className = x[0];
    div.innerText = x[1];
    contenedorMensaje.appendChild(div);
  }
  mensajes.appendChild(contenedorMensaje);
};

export const registrarAviso = (msg,clase) => {
  let contenedorMensaje = document.createElement("div");
  contenedorMensaje.className = `ContenedorAviso ${clase}`;
  contenedorMensaje.innerText = msg;
  mensajes.appendChild(contenedorMensaje);
};

export let BotonSalir = document.getElementById("BotonSalir").onclick = () => {
  location.href=regresar.value;
}

export let miNombre = document.getElementById('miNombre');
export let familiarNombre = document.getElementById('familiarNombre');
export let url = document.getElementById('url');
export let regresar = document.getElementById('regresar');
