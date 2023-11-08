const express = require('express');
const soap = require('soap');
const bodyParser = require('body-parser');
const mysql = require('mysql');

const service = {
  PersonService: {
    PersonServiceSoapPort: {
      GetPersonDetails: function(args, callback) {
        // Aquí implementas la consulta a la base de datos
        connection.query('SELECT * FROM personas WHERE dni = ?', [args.dni], function (error, results) {
          if (error) {
            return callback(error);
          }
          callback(null, { person: results });
        });
      }
    }
  }
};

const xml = require('fs').readFileSync('PersonService.wsdl', 'utf8');

// Crea la conexión a la base de datos
const connection = mysql.createConnection({
  host     : 'db', // Nombre del servicio de la base de datos en docker-compose.yml
  user     : 'root',
  password : 'my-secret-pw',
  database : 'personas_db'
});

const app = express();

// Se necesita bodyParser para manejar la solicitud SOAP
app.use(bodyParser.raw({type: function() { return true; }, limit: '5mb'}));
app.listen(8888, function() {
  const wsdlPath = '/wsdl';
  soap.listen(app, wsdlPath, service, xml, function(){
    console.log('Servidor SOAP corriendo en el puerto 8888');
  });
});

// Aquí agregarías el WSDL y los archivos XSD necesarios para definir tu servicio SOAP.
