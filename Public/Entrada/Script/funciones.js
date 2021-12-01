// funcion para verificar el acceso
export function obtenerAcceso(dataQR){
    dataQR.acceso = "Entrada"; 
    let url = '../ControlAcceso';
    fetch(url, { method: 'POST', body: JSON.stringify(dataQR) , headers:{'Content-Type': 'application/json' } })
        .then(res => res.json() )
        .then( res => mostrarMensaje( res ) )
        .catch(error => console.error('Error:', error));
}

// Mostrar el resultado del servidoe
export function mostrarMensaje(resultado) {
    console.log( resultado );
}