CREATE DATABASE IF NOT EXISTS personas_db;
USE personas_db;
CREATE TABLE personas (
  Apellidos VARCHAR(255) NOT NULL,
  Nombres VARCHAR(255) NOT NULL,
  dni INT PRIMARY KEY
);
