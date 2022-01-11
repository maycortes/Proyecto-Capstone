# Sistema de Control de Acceso y Videollamada

## Descripción

Durante la emergencia sanitaria generada por el COVID 19 un problema que se presento fue la limitación de visitas hospitalarias para reducir riesgos que afecten la salud de la población, esto perjudica tanto a los pacientes como a los familiares, ya que, no permite la convivencia entre el paciente y el familiar y no se puede observar el estado de salud del paciente.
Aunque existan herramientas de software para realizar una videollamada, no todos los hospitales pueden utilizalas, ya que, algunos hospitales no cuentan con una infraestructura de comunicaciones requerida para utilizar estos softwares, no cuentan con los equipos requeridos para instalar el software o simplemente no pueden adquirir el software por su costo.
Este presente proyecto permite realizar videollamadas entre paciente-familiar mediante dispositivos electrónicos que cuenten con un navegador web. El sistema se implementa en el entorno de ejecución multiplataforma llamado NodeJS, mediante el sistema de gestión de paquetes NPM se pueden utilizar los paquetes como Express, Socket IO, HTTPS, fs y WebRTC, este último es el encargado de realizar el procedimiento para la comunicación entre los dos dispositivos que van a realizar la videollamada. Al implementar este sistema se logra comunicar a los pacientes con sus familiares sin afectar la infraestructura de comunicaciones del hospital, se logra utilizar dispositivos electrónicos con recursos mínimos para la comunicación y permite ejecutar el sistema de videollamadas en cualquier sistema operativo.

## Introduccion

Imaginemos un escenario donde un día despiertas en un lugar con personas desconocidas, te encuentras acostado con poco o nulo espacio para moverte y no puedes tener una comunicación con las personas en tu alrededor, ya que, tu o algunos de ellos, se encuentra intubado para recibir asistencia ventilatoria, llevas más de dos semanas aislado del mundo exterior sin poder hablar y ver a tus familiares y amigos, además, te encuentras enfermo y no sabes si volverás a ver a estas personas. Ahora, imaginemos otro escenario donde un familiar o amigo tuyo se encuentra aislado en algún lugar, sabes que esta persona se encuentra enferma, pero, no sabes su estado de salud y en cualquier momento puedes recibir la noticia de que ya está muerto.
En los dos escenarios ¿Qué sensación tienes al no poder expresar tus sentimientos a tu familiar o amigo?, pero, estos dos escenarios, no hay que imaginarlos, se puede observar en todos los hospitales en la actual pandemia, ya que, durante la emergencia sanitaria generada por el COVID 19, los hospitales recurrieron a la necesidad de crear medidas sanitarias para prevenir un evento que origine riesgos que afecten la salud de la población, uno de ellos, fue la limitación de las visitas hospitalarias e inclusive la suspensión del acceso a familiares para prevenir la transmisión nosocomial [1].
Ante este problema, ¿Cómo se podría ayudar a estas personas a comunicarse?, Tal vez estés pensando, solo se necesita realizar una llamada telefónica o utilizar una aplicación de videoconferencia de alguna empresa privada, pero, para estas opciones, se necesita de un proveedor de servicio de telefonía o servicio de internet, y es necesario alquilar estos servicios. Entonces, ¿Cuánto presupuesto se debe tener para que todos los pacientes se puedan comunicar con sus familiares por medio de una llamada telefónica?, ¿Crees que el hospital tiene la infraestructura de comunicaciones para realizar videollamadas?, Tal vez para un hospital privado, no tenga algún problema estas cuestiones, pero, para un hospital público, son cosas que debe considerar.
Este proyecto pretende ayudar a estas personas a comunicarse utilizando dispositivos móviles, ¿Y cómo se logrará?, Utilizando un sistema web en tiempo real, ¿Qué es esto?, es una manera de comunicación basada en la web que utiliza tecnologías y prácticas que permiten a los usuarios recibir información tan pronto como es publicada por sus autores, en vez de ser requerida por los usuarios [2].
Aunque al principio se pensaba que la web solo serviría para mostrar información, se han creado tecnologías que ayudan a tener aplicaciones en tiempo real, como, por ejemplo, los sockets, los cuales, son un método para la comunicación entre un programa del cliente y un programa del servidor en una red, se define, por tanto, como el punto final en una conexión [2]. La tecnología que permitirá realizar esta videoconferencia se llama WebRTC, que básicamente, es un proyecto libre y de código abierto que proporciona a los navegadores web y a las aplicaciones móviles comunicación en tiempo real a través de interfaces de programación de aplicaciones [2].

## Justificacion

Debido a la emergencia sanitaria generada por el COVID 19, los pacientes que presentan síntomas graves de esta enfermedad y acuden a un hospital o centro de salud, deben ser aislados para ayudarlos en su recuperación y prevenir contagios a la población, por lo que no es posible la comunicación con sus familiares.
En la actualidad existen aplicaciones como Zoom, Meet o Skype que permiten realizar una videoconferencia, pero, para utilizarlas, en algunas de ellas se necesita instalar una aplicación en los dispositivos móviles, implica que se necesite memoria para instalarlas y utilizarlas, la cual, no todos los dispositivos móviles cuentan con la suficiente.
Además, para realizar una videollamada como por ejemplo Zoom en una calidad de 720p, se requiere de 1.2 Mbps [3], si se necesita al menos de 20 minutos para realizar la videollamada, se requiere de 180 MB por dispositivo, para la comunicación 1 a 1, se necesitan de 360 MB, en cada dispositivo, se requiere un plan con algún proveer de servicios como por ejemplo Telcel, el cual, para este ejemplo, costaría 199 pesos MXN para cada dispositivo [4] y en total 389 pesos MXN. Para una videollamada esto podría ser suficiente, pero, un hospital atiende a 157 pacientes COVID [5] y utilizar estas aplicaciones es un costo monetario elevado.
Si estas aplicaciones se utilizan en la red de comunicaciones del hospital, se verían afectadas las comunicaciones o el servicio de internet, para ello, se necesitaría ampliar la infraestructura de comunicaciones del hospital.
También se debe considerar que hay aplicaciones como Zoom que limitan el tiempo para la videollamada o se debe tener una cuenta de correo electrónico como en Meet para utilizarlas.
El proyecto que se propone permitiría realizar una videollamada privada entre paciente y familiar sin la necesidad de contar con un proveedor de acceso a internet, sin la necesidad de depender de una aplicación de terceros y permitiendo tener un sistema de comunicación de bajos recursos que pueda utilizar dispositivos móviles, tales como smartphone, tabletas o computadoras sin interferir con la infraestructura de comunicaciones del hospital.

## Objetivos

### Objetivo General

Crear un sistema de control de acceso para un hospital utilizando códigos QR y un sistema de videollamadas para uso de visitantes-pacientes.

### Objetivo Especifico

-	Crear un servidor que permita proveer las páginas de cada módulo, sincronizar las conexiones entre nodos, la conexión con la base de datos, establecer una conexión mediante sockets y crear archivos PDFs.
-	Diseñar e implementar un módulo que registre la entrada de un visitante mediante el uso de un código QR
-	Diseñar e implementar un módulo que registre la salida de un visitante mediante el uso de un código QR
-	Diseñar e implementar un módulo que permita crear una nueva sala de videollamada privada con datos del paciente y el familiar mediante el uso de un código QR
-	Diseñar e implementar un módulo que permita mostrar las salas de videoconferencia existentes y poder seleccionar a cuál de ellas conectarse.
-	Diseñar e implementar un módulo que permita iniciar una conversación de videoconferencia en la sala que fue creada o seleccionada.
-	Diseñar e implementar un módulo que permita registrar a un paciente y al visitante en la Base de Datos y mostrar el PDF con los datos del paciente, visitante y código QR generado por el servidor.
-	Diseñar una Base de Datos para registrar los datos del paciente y del visitante.

## Video Introductorio

![](https://www.youtube.com/watch?v=TGwgfJ-IZqs&ab_channel=FrancoEscamilla)