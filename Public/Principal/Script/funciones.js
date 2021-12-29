import { titulo_matricula , titulo_pwd , expresiones , form , mensajeMatricula , mensajePassword , mensajeSeccion , mensanje} from './identificadores.js'

export function moverTitulosInicio(){
    titulo_matricula.className = form[0].value == "" ? "titulo_label_abajo" : "titulo_label_arriba";
    titulo_pwd.className = form[1].value == "" ? "titulo_label_abajo" : "titulo_label_arriba";
}

export function moverTitulos( e ){
    switch( e.target.name ){
        case "matricula":
            titulo_matricula.className = e.target.value == "" ? "titulo_label_abajo" : "titulo_label_arriba";
        break
        case "pwd":
            titulo_pwd.className = e.target.value == "" ? "titulo_label_abajo" : "titulo_label_arriba";
        break
    }
}

function verificarDatos(){
    let seguir = true;

    if( !(expresiones.matricula.test( form[0].value )) ){
        seguir = false;
        mensajeMatricula.style.display = null;
    }else{
        mensajeMatricula.style.display = 'none';
    }

    if( !(expresiones.pwd.test( form[1].value )) ){
        seguir = false;
        mensajePassword.style.display = null;
    }else{
        mensajePassword.style.display = 'none';
    }

    if( form[2].value == "f" ){
        seguir = false;
        mensajeSeccion.style.display = null;
    }else{
        mensajeSeccion.style.display = 'none';
    }

    return seguir;
}

export function enviarDatos() {
    if( verificarDatos() ){
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
    }else{
        console.log("Checa que pedo");
    }
}

function obtenerAcceso( dato ) {
    if( dato.acceso ){
        let acceso = document.getElementById('acceso');
        acceso.action = dato.url;
        acceso["codigo"].value = dato.codigo;
        mensanje.style.display = 'none';
        ingresar.style.display = null;
        for( let i = 0 ; i < 3 ; i++ ){
            form[i].value = "";
        }
        acceso.submit();
    }else{
        mensanje.style.display = 'none';
        ingresar.style.display = null;
        alert(" Acceso denegado ")
    }
}