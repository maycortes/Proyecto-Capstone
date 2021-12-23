import { ingresar , form , mensanje } from './identificadores.js';

// Evento al presionar el boton ingresar
ingresar.addEventListener( 'click' , () => {
    mensanje.style.display = null;
    ingresar.style.display = "none";
    let dato = {};
    for( let i = 0 ; i < form.length - 1 ; i++ ){
        dato[ form[i].id ] = form[i].value;
    }
    console.log(dato);
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
        mensanje.style.display = 'none';
        ingresar.style.display = null;
        alert(" Acceso denegado ")
    }
}
