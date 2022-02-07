# FROM maven:3.8.1 as BUILDER
# ARG VERSION=0.0.1-SNAPSHOT
# WORKDIR /build/ 
# COPY pom.xml /build/
# COPY src /build/src/

# RUN mvn clean package
# COPY target/booting-web-${VERSION}.jar target/application.jar

# FROM openjdk:11.0.9
# WORKDIR /app/

# COPY --from=BUILDER /build/target/application.jar /app/
# CMD java -jar /app/application.jar

FROM openjdk
WORKDIR //app//
# COPY target/*.jar /
EXPOSE 8080
ENTRYPOINT ["java","-jar","/my-app-1.0-SNAPSHOT.jar"]