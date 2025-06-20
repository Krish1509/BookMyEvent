# ----------- Stage 1: Build -----------
FROM maven:3.9.4-eclipse-temurin-21 AS builder
WORKDIR /app

# Copy Maven files and source code
COPY pom.xml .
COPY src ./src

# Package the application
RUN mvn clean package -DskipTests

# ----------- Stage 2: Run ------------
FROM openjdk:21-jdk-slim
WORKDIR /app

# Copy JAR from builder stage
COPY --from=builder /app/target/*.jar app.jar

# Expose the Spring Boot default port
EXPOSE 8080

# Run the app
ENTRYPOINT ["java", "-jar", "app.jar"]
