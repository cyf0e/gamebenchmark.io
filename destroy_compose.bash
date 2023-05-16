#!/bin/bash
docker compose down
docker compose rm -f
docker volume rm benchmarkbackend_postgres-data