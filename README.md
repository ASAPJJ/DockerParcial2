# DockerParcial2
Primero clonamos el repositorio utilizando 

    git clone https://github.com/ASAPJJ/DockerParcial2.git

Como siguiente paso procederemos a iniciar el Swarm con el siguiente comando

    docker swarm init

Una vez iniciado el swarm, estos son los comandos para crear las imagenes


    docker build -t mi-mysql-image:latest ./sql

    docker build -t jj/mi-soap-service:latest ./SOAP

    docker build -t jj/mi-rest-service:latest ./rest

    docker build -t jj/mi-web-service:latest ./appweb

Luego de crear las imagenes deberias ejecutar la siguiente linea 

    docker stack deploy -c docker-compose.yml parcial_servicios

y empezarian a ejecutarse los servicios de docker swarm