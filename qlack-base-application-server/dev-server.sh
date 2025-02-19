#!/usr/bin/env bash
mvn spring-boot:run \
  -Dspring-boot.run.jvmArguments="-Xdebug -XX:+ShowCodeDetailsInExceptionMessages -Xrunjdwp:transport=dt_socket,server=y,suspend=n,address=8081" \
  -Dspring-boot.run.arguments="--server.port=8080"