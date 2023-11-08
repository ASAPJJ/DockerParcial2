FROM mysql:5.7
ENV MYSQL_DATABASE personas_db
ENV MYSQL_ROOT_PASSWORD my-secret-pw
COPY schema.sql /docker-entrypoint-initdb.d/
