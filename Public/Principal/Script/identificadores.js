// Identificador para el formulario
export let form = document.getElementById('Formulario');

// Boton para enviar formulario
export let ingresar = document.getElementById( 'ingresar' );

// Mensaje de Espera
export let mensanje = document.getElementById('mensanje');

//Titulos para los inputs
export let titulo_matricula = document.getElementById('titulo_matricula');
export let titulo_pwd = document.getElementById('titulo_pwd');

// Mensaje de Restricciones
export let mensajeMatricula = document.getElementById('mensajeMatricula');
export let mensajePassword = document.getElementById('mensajePassword');
export let mensajeSeccion = document.getElementById('mensajeSeccion');

// Expresiones Regulares para la validacion de formularios
export let expresiones = {
    matricula : /\d{10}/,
    pwd : /\w|\W/
}