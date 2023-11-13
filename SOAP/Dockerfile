# Utiliza la imagen base de Node.js 14 Alpine
FROM node:18-alpine

# Crea el directorio de trabajo dentro del contenedor
WORKDIR /app

# Copia el archivo de dependencias
COPY package.json /app

# Instala las dependencias
RUN npm install

# Copia el resto de los archivos de la aplicación
COPY . .

# Expone el puerto que usará la aplicación
EXPOSE 8888

# Define el comando que ejecutará la aplicación
CMD ["node", "soap-server.js"]
