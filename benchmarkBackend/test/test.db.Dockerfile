FROM postgres:15.2
WORKDIR /db
COPY ./db ./
ENV PGHOST="localhost"
ENV POSTGRES_PASSWORD="admin"
ENV PGUSER="postgres"
ENV PGDATABASE="public"
