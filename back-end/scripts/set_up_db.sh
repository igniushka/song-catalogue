#!/bin/bash

docker-compose -f ./postgres.yml up -d
sleep 15
./gradlew liquibase