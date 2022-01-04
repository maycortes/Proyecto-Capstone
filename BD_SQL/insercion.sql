INSERT INTO hospital.Seccion (idSec,nombreSec) VALUES ( 0 ,"Registro");
INSERT INTO hospital.Seccion (idSec,nombreSec) VALUES ( 0 ,"Entrada");
INSERT INTO hospital.Seccion (idSec,nombreSec) VALUES ( 0 ,"Salida");
INSERT INTO hospital.Seccion (idSec,nombreSec) VALUES ( 0 ,"Visitante");
INSERT INTO hospital.Seccion (idSec,nombreSec) VALUES ( 0 ,"Paciente");

INSERT INTO hospital.Administrativo (idAdm,nombreAdm,apellido1Adm,apellido2Adm,matricula,pwd) VALUES (0,"root","","",2172002687,aes_encrypt("root","uam"));

INSERT INTO hospital.Encargado (idEnc,idAdm,idSec) VALUES (0,0,1);
INSERT INTO hospital.Encargado (idEnc,idAdm,idSec) VALUES (0,0,2);
INSERT INTO hospital.Encargado (idEnc,idAdm,idSec) VALUES (0,0,3);
INSERT INTO hospital.Encargado (idEnc,idAdm,idSec) VALUES (0,0,4);
INSERT INTO hospital.Encargado (idEnc,idAdm,idSec) VALUES (0,0,5);