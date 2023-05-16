#!/bin/bash

if ! [[ -e "$(command -v docker)" ]];then
echo "Docker is not installed and is needed for this test."
exit
fi
if ! [[ -e "$(command -v node)" ]];then
echo "Nodejs is not installed and is needed for this test."
exit
fi
if ! [[ -e "$(command -v npm)" ]];then
echo "NPM is not installed and is needed for this test."
exit
fi

echo "Starting database container"

PG_CONT_NAME=backendIntegrationTestContainer
PG_IMAGE_NAME=benchmark-backend-integration-test-database
READY_STATE=wrong

if [[ "$(docker images | grep $PG_IMAGE_NAME)" != *"$PG_IMAGE_NAME"* ]];then
echo "No database image."
echo "Building one now."
docker build -t  $PG_IMAGE_NAME -f ./test/test.db.Dockerfile .
fi

if [[ "$(docker images | grep $PG_IMAGE_NAME)" != *"$PG_IMAGE_NAME"* ]];then
echo "Image failed to build. Exiting..."
exit
fi

PG_CONT_NAME="$(docker run --rm -d -p 5432:5432 $PG_IMAGE_NAME)"
PG_CONT_NAME="${PG_CONT_NAME:0:9}"

if [[ "$(docker ps | grep $PG_CONT_NAME)" != *"$PG_CONT_NAME"* ]];then
echo "Docker failed to start the container. Exiting..."
exit
fi

echo "Waiting for database to be ready"
while [[ $READY_STATE != *"accepting connections"* ]];
do
echo -n "."
READY_STATE="$(docker exec $PG_CONT_NAME pg_isready -d postgres)"
done
echo $READY_STATE
#: $(cmd) used to supress the output
echo "Restoring database schema..."
: $(docker exec $PG_CONT_NAME psql -d postgres -f "./dbschema.sql")
echo "Schema restored"
: $(docker exec $PG_CONT_NAME psql -d postgres -c "INSERT INTO componenttypes(typeid,category) VALUES ('1','GPU'),('2','CPU')")
npm run integration-test
echo "Stopping database container."
docker container stop $PG_CONT_NAME

