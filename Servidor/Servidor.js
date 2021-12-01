//Módulo local Dep.js
const { app , express , fs , https , path } = require('./Dependencias');

// Módulo local Direcciones
const { permitirAccesoPaginas , mostrarRegistro , crearPDF , mostrarPDF , mostrarEntrada , mostrarSalida , controlAcceso} = require('./Direccion');

//Se agrega el puerto 3000
app.set( 'port' , 3000 );
//Se agrega la Direccion IP
app.set( 'address' , '192.168.1.67' );

///Documentos estaticos
app.use('/Principal', express.static( path.join( __dirname , '..' , 'Public' , 'Principal' ) ));

//Middleware que analiza archivos urlencoded en solicitudes post
app.use(express.urlencoded({ extended: true }));
app.use(express.json({ type: "application/json" }));

// Pagina Registro
app.use('/EstilosRegistro', express.static( path.join( process.cwd() , 'Public' , 'Registro' , 'Estilos' ) ));
app.use('/ScriptRegistro', express.static( path.join( process.cwd() , 'Public' , 'Registro' , 'Script' ) ));
app.post( '/Registro' , mostrarRegistro );

// Archivos estaticos para el Scanner QR
app.use('/ModuloScannerQR', express.static( path.join( process.cwd() , 'node_modules' , 'qr-scanner' ) ));

// Pagina Entrada
app.use('/EstilosEntrada', express.static( path.join( process.cwd() , 'Public' , 'Entrada' , 'Estilos' ) ));
app.use('/ScriptEntrada', express.static( path.join( process.cwd() , 'Public' , 'Entrada' , 'Script' ) ));
app.post('/Entrada', mostrarEntrada);

// Pagina Salida
app.use('/EstilosSalida', express.static( path.join( process.cwd() , 'Public' , 'Salida' , 'Estilos' ) ));
app.use('/ScriptSalida', express.static( path.join( process.cwd() , 'Public' , 'Salida' , 'Script' ) ));
app.post('/Salida', mostrarSalida);

// Respuesta al solicitar acceso a las paginas Registro, Entrada, Salida, Visitante y Paciente
app.post( '/solictarAcessoPaginas' , permitirAccesoPaginas );
// Creacion de Archivos PDF
app.post('/CrearPDF', crearPDF);
// Mostrar archivo PDF
app.post('/MostrarPDF', mostrarPDF);
// Control de Acceso
app.post('/ControlAcceso', controlAcceso);

//Configuracion del Servidor https
const server = https.createServer( {
  cert : fs.readFileSync( path.join( __dirname , 'Certificados' , 'cert.pem' ) ),
  key : fs.readFileSync( path.join( __dirname , 'Certificados' , 'key.pem' ) )
} , app ).listen( app.get('port') , function() {
  console.log('Servidor https corriendo en puerto ' , app.get('port'));
});

module.exports = {
	app: app , server: server , puerto: app.get('port') , direccionIP: app.get('address')
}