//Módulo local Dep.js
const Dep = require('./dependencias.js');

// Modulo GenerarPDF
const generarPDF = require('./generarPDF');

//Se agrega el puerto 3000
Dep.app.set( 'port' , process.env.PORT || 3000 );
//Se agrega la Direccion IP
Dep.app.set( 'address' , '192.168.1.67' ); 

//Dirección de los archivos estaticos
Dep.app.use( Dep.express.static( Dep.path.join( __dirname , '..' , "Documentos_PDF" ) ) );
Dep.app.use( Dep.express.static( Dep.path.join( __dirname , '..' ) ) );

///Documentos estaticos
Dep.app.use('/Registro', Dep.express.static( Dep.path.join( __dirname , '..' , 'Public' , 'Registro' ) ));
Dep.app.use('/ControlAcceso', Dep.express.static( Dep.path.join( __dirname , '..' , 'Public' , 'ControlAcceso' ) ));

//Middleware que analiza archivos urlencoded en solicitudes post
Dep.app.use(Dep.express.urlencoded({ extended: true }));
Dep.app.use(Dep.express.json( {type : "application/json"} ));

//Documentos dinamicos con ejs
Dep.app.post( '/CrearPDF' , (req,res) => {
  let datos = req.body;
  generarPDF.crearPDF( datos ).then(()=> {
    res.send(JSON.stringify( { "nombrePDF" : datos.NSS } ));
  });
});

//Configuracion del Servidor https
const server = Dep.https.createServer( {
  cert : Dep.fs.readFileSync( Dep.path.join( __dirname , '..' , 'Certificados' , 'cert.pem' ) ),
  key : Dep.fs.readFileSync( Dep.path.join( __dirname , '..' , 'Certificados' , 'key.pem' ) )
} , Dep.app ).listen( Dep.app.get('port') , function() {
  console.log('Servidor https corriendo en puerto ' , Dep.app.get('port'));
});

module.exports = {
	app: Dep.app,
	server: server,
  puerto: Dep.app.get('port'),
  direccionIP: Dep.app.get('address')
}