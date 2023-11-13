const express = require("express");
const { Sequelize, Model, DataTypes } = require("sequelize");
const cors = require("cors");

// Configuración de Sequelize
const sequelize = new Sequelize('personas_db', 'root', 'my-secret-pw', {
  host: 'db',
  dialect: 'mysql'
});

// Definición del modelo Persona
class Persona extends Model {}

Persona.init({
  Apellido: DataTypes.STRING,
  Nombre: DataTypes.STRING,
  DNI: DataTypes.STRING
}, { sequelize, modelName: 'Persona', tableName: 'personas', timestamps: false });

// Sincronizar el modelo con la base de datos
sequelize.sync();

const app = express();
app.use(express.json());
app.use(cors());

// Endpoint para insertar una persona utilizando Sequelize
app.post('/insertar_con_rest', async (req, res) => {
  try {
    const { Apellido, Nombre, DNI } = req.body;
    if (!Apellido || !Nombre || !DNI) {
      return res.status(400).send({ message: "Todos los campos son requeridos." });
    }
    
    const nuevaPersona = await Persona.create({ Apellido, Nombre, DNI });
    return res.status(201).send({ message: "Persona insertada", persona: nuevaPersona });
  } catch (error) {
    console.error('Error al insertar en la base de datos:', error);
    return res.status(500).send({ message: "Error al insertar datos", error: error });
  }
});

const port = 8080;
app.listen(port, () => {
  console.log(`Servicio REST escuchando en el puerto ${port}.`);
});
