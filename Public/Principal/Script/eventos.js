import { ingresar , form } from './identificadores.js';
import { moverTitulos , enviarDatos , moverTitulosInicio } from './funciones.js'

ingresar.addEventListener( 'click' , enviarDatos );

form[0].addEventListener( 'keyup' , moverTitulos );
form[1].addEventListener( 'keyup' , moverTitulos );

moverTitulosInicio();