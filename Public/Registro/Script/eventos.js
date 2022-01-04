import * as funciones from './funciones.js'
import * as ids from './identificadores.js'

// Eventos para los botones
ids.btn_almacenador.addEventListener( 'click' , funciones.mostrarSeccion );
ids.btn_visualizador.addEventListener( 'click' , funciones.mostrarSeccion );

ids.btn_enviar.addEventListener( 'click' , funciones.enviarFormularioUsuario )

ids.btn_mostrar.addEventListener( 'click' , funciones.obtenerPDFAlmacenado)
ids.btn_limpiar.addEventListener( 'click' , funciones.limpiarSeccionVisualizador )

// Eventos para los labels
for( let i = 0 ; i < 13 ; i++ ){
    ids.seccion_almacenador.addEventListener( 'keyup' , funciones.moverLabel )
}

ids.input_visualizador.addEventListener( 'keyup' , funciones.moverLabel )