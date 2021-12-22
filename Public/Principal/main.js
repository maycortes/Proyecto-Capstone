// Identificador para el formulario
let form = document.getElementById('Formulario');
// Variable para elementos del formulario
let elementos = form.elements;

// Boton para enviar formulario
let Enviar = document.getElementById( 'enviar' );

// Evento al presionar el boton enviar
Enviar.addEventListener( 'click' , () => {
    let dato = {};
    for( let i = 0 ; i < form.length - 1 ; i++ ){
        dato[ form[i].id ] = form[i].value;
    }
    fetch( '../solictarAcessoPaginas' , { method: 'POST', body: JSON.stringify(dato), headers: { 'Content-Type': 'application/json' } })
    .then(res => res.json())
    .then(obtenerAcceso)
    .catch(error => console.error('Error:', error));
});

function obtenerAcceso( dato ) {
    if( dato.acceso ){
        let acceso = document.getElementById('acceso');
        acceso.action = dato.url;
        acceso["codigo"].value = dato.codigo;
        acceso.submit();
    }else{
        alert(" Acceso denegado ")
    }
}
