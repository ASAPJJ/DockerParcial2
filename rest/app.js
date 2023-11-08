const express = require('express');
const bodyParser = require('body-parser');
const mysql = require('mysql');

// Crea la conexión a la base de datos
const connection = mysql.createConnection({
  host     : 'db', // Nombre del servicio de la base de datos en docker-compose.yml
  user     : 'root',
  password : 'my-secret-pw',
  database : 'personas_db'
});

// Inicia la aplicación express
const app = express();

// Configura el middleware para parsear JSON
app.use(bodyParser.json());

// Define el endpoint POST para insertar personas
app.post('/insertar_con_rest', function (req, res) {
  const persona = req.body;
  connection.query('INSERT INTO personas SET ?', persona, function (error, results, fields) {
    if (error) throw error;
    res.send(JSON.stringify(results));
  });
});

// Inicia el servidor
app.listen(8080, function () {
  console.log('Servicio REST escuchando en el puerto 8080.');
});
