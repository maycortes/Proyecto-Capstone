// Modulo de dependecias
const { fs , path , pdf } = require('../Dependencias');
// Modulo generar QR
const {GenerarCodigoQR} = require('../QR/main');

// Funcion que permite crear un PDF
exports.crearArchivoPDF = async function ( datos, usuario, FuncionTermino ){
    try {
        let codigoQR = await GenerarCodigoQR(JSON.stringify(usuario));

        const doc = new pdf();
    
        // Seccion logos
        doc.fillOpacity(0.4).image( path.join( __dirname , "Imagenes" , "uam.png" ) , 50, 5, {width: 170})
        doc.fillOpacity(0.4).image( path.join( __dirname , "Imagenes" , "cbi.png" ) , 220, 5, {width: 170})
        doc.fillOpacity(0.4).image( path.join( __dirname , "Imagenes" , "iot.png" ) , 400, 5, {width: 170})
        
        doc.fillOpacity(1);
        
        // Divisor de secciones
        doc.lineCap('butt').lineWidth(2).moveTo(40, 80).lineTo(580, 80).fillAndStroke("#2A5CA1", "#2A5CA1");
        doc.lineCap('butt').lineWidth(2).moveTo(40, 120).lineTo(580, 120).fillAndStroke("#2A5CA1", "#2A5CA1");
        doc.lineCap('butt').lineWidth(2).moveTo(40, 250).lineTo(580, 250).fillAndStroke("#2A5CA1", "#2A5CA1");
        doc.lineCap('butt').lineWidth(2).moveTo(40, 410).lineTo(580, 410).fillAndStroke("#2A5CA1", "#2A5CA1");
        
        // Titulos
        doc.fontSize(20);
        doc.font('Times-Roman').fillColor('#2A5CA1').text('Sistema de Control de Acceso y Videoconferencia', 100, 90);
        doc.fontSize(15);
        doc.font('Times-Roman').fillColor('#2A5CA1').text('Datos del Paciente', 50 , 140);
        doc.font('Times-Roman').fillColor('#2A5CA1').text('Datos del Visitante', 50 , 270);
        doc.font('Times-Roman').fillColor('#2A5CA1').text('Código QR', 50 , 430);
        
        // Primera tabla (celdas)
        doc.lineJoin('round').rect( 50, 160, 500, 25).fill("#D5DCE4");
        doc.lineJoin('round').rect( 50, 210, 500, 25).fill("#D5DCE4");
        
        // Segunda tabla (celdas)
        doc.lineJoin('round').rect( 50, 290, 500, 25).fill("#D5DCE4");
        doc.lineJoin('round').rect( 50, 340, 500, 25).fill("#D5DCE4");
        
        // Texto de la primera Tabla
        doc.fontSize(12);
        // Primer Reglon
        doc.fillColor('#000000').text( `Nombre(s): ${datos.nombrePac}` , 75 , 167);
        doc.fillColor('#000000').text( `No. Cama: ${datos.numeroCama}` , 380 , 167);
        // Segundo Reglon
        doc.fillColor('#000000').text( `Primer Apellido: ${datos.apellido1Pac}` , 75 , 193);
        doc.fillColor('#000000').text( `No. Piso: ${datos.numeroPiso}` , 380 , 193);
        // Tercer Reglon
        doc.fillColor('#000000').text( `Segundo Apellido: ${datos.apellido2Pac}` , 75 , 221);
        doc.fillColor('#000000').text( `NSS: ${datos.nss}` , 380 , 221);
        
        // Texto de la segunda Tabla
        doc.fontSize(12);
        // Primer Reglon
        doc.fillColor('#000000').text( `Nombre(s): ${datos.nombreVis}` , 75 , 300);
        doc.fillColor('#000000').text( `Telefono 1: ${datos.telefono1}` , 380 , 300);
        // Segundo Reglon
        doc.fillColor('#000000').text( `Primer Apellido: ${datos.apellido1Vis}` , 75 , 326);
        doc.fillColor('#000000').text( `Telefono 2: ${datos.telefono2}` , 380 , 326);
        // Tercer Reglon
        doc.fillColor('#000000').text( `Segundo Apellido: ${datos.apellido2Vis}` , 75 , 352);
        doc.fillColor('#000000').text( `Correo: ${datos.correo}` , 380 , 352);
        // Cuarto Reglon
        doc.fillColor('#000000').text( `Dirección: ${datos.direccion}` , 75 , 376);
        
        // Codigo QR
        doc.image( codigoQR , 170, 425, {width: 220});
        
        // Texto de Aviso
        let aviso = `Este código solo es valido para el visitante ${datos.nombreVis} ${datos.apellido1Vis}, con el podrás entrar al hospital y realizar la videollamada con el paciente.`;
        doc.fillColor('#000000').text(aviso, 50 , 640 , { width: 514,align: 'justify'});
        doc.fillColor('#000000').text( "Los horarios de visitan son los siguientes:" , 50 , 680);
        doc.fillColor('#000000').text( "- Lunes a Viernes de 10:00 am a 14:00 pm " , 60 , 700);
        
        // celda final archivo
        doc.lineJoin('round').rect( 20, 730, 572, 35).fill("#2A5CA1");

        let archivo = fs.createWriteStream( path.join( process.cwd() , 'Documentos_PDF' , `${datos.nss}.pdf` ) );
        doc.pipe( archivo )

        archivo.on( 'finish' , () => {
            FuncionTermino();
        });

        doc.end();

    } catch (error) {
        console.log(error);
    }
}
