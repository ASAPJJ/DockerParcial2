const express = require('express');
const soap = require('soap');
const { Sequelize, DataTypes } = require('sequelize');
const cors = require('cors');

// Configuración de Sequelize
const sequelize = new Sequelize('personas_db', 'root', 'my-secret-pw', {
  host: 'db',
  dialect: 'mysql',
});

// Definición del modelo Persona
const Persona = sequelize.define('Persona', {
  Apellido: DataTypes.STRING,
  Nombre: DataTypes.STRING,
  DNI: DataTypes.STRING,
}, {
  tableName: 'personas',
  timestamps: false,
});

// Iniciar y sincronizar Sequelize
sequelize.sync();

const app = express();
app.use(cors());

// Necesario para procesar el cuerpo de las solicitudes SOAP
app.use(express.raw({ type: () => true, limit: '5mb' }));

const service = {
  PersonService: {
    PersonServiceSoapPort: {
      GetPersonDetails: async function(args, callback) {
        try {
          // Usar Sequelize para obtener los detalles de una persona
          const persona = await Persona.findOne({ where: { DNI: args.dni } });
          callback(null, { person: persona });
        } catch (error) {
          console.error('Error al consultar en la base de datos:', error);
          callback(error);
        }
      }
    }
  }
};

const xml = require('fs').readFileSync('PersonService.wsdl', 'utf8');

app.listen(8888, function() {
  soap.listen(app, '/wsdl', service, xml);
  console.log('Servidor SOAP corriendo en el puerto 8888');
});
