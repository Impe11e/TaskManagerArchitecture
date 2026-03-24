FROM postgres:18

COPY db/init.sql /docker-entrypoint-initdb.d/

ENV POSTGRES_USER=user2
ENV POSTGRES_PASSWORD=pass
ENV POSTGRES_DB=mydb

EXPOSE 5432