####################################################################################################
# Docker multistage build setup for the backend app.
####################################################################################################

####################################################################################################
# Cache Maven dependencies.
####################################################################################################
FROM maven:3.8.1-openjdk-17 as maven
MAINTAINER qlack@eurodyn.com

# Set working directory.
WORKDIR /maven

# Copy application's pom.xml.
COPY pom.xml /maven/pom.xml

# Download Maven dependencies.
RUN mvn dependency:go-offline

####################################################################################################
# Build application.
####################################################################################################
FROM maven:3.8.1-openjdk-17 as build
MAINTAINER qlack@eurodyn.com

# Set working directory
WORKDIR /app

COPY pom.xml /app/pom.xml
COPY src /app/src
COPY --from=maven /root/.m2 /root/.m2

RUN mvn clean package spring-boot:repackage -Pprod

####################################################################################################
# Create application image.
####################################################################################################
FROM eclipse-temurin:17-jre-alpine
MAINTAINER qlack@eurodyn.com

# Set working directory
WORKDIR /app

# Add app
COPY --from=build /app/target/qlack-base-application-server-*.jar /app/qlack-base-application-server.jar

ENTRYPOINT ["/opt/java/openjdk/bin/java"]
CMD ["-jar", "-Dspring.profiles.active=prod", "/app/qlack-base-application-server.jar"]
