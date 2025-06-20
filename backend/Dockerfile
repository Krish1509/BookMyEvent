# Use official JDK image
FROM openjdk:21-jdk-slim

# Set working directory inside container
WORKDIR /app

# Copy the compiled jar file to container
COPY target/*.jar app.jar

# Expose Spring Boot default port
EXPOSE 8080

# Run the Spring Boot application
ENTRYPOINT ["java", "-jar", "app.jar"]
