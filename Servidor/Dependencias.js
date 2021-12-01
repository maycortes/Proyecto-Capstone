//Módulo que proporciona utilizades para trabajar con rutas de archivos y directorios
const path = require('path');

//Módulo que permite interactuar con el sistema de archivos de una manera modelada en funciones POSIX estandar
const fs = require('fs');

//Módulo que permite implementar https, https es el protocolo http sobre TLS /SSL
const https = require('https');

// Modulo MYSQL que permite realizar conexion y consultas a la BD
const mysql = require('mysql');

//Módulo para crear aplicaciones Web y API.
//Express es un marco de aplicaciones web de Back-end para Node.js
const express = require('express');

module.exports = {
	path,
	fs,
	https,
	app: express(),
	express : express,
	mysql: mysql
}