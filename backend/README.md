# BookMyEvent Backend

## Overview
This is the backend service for the BookMyEvent application, built using Spring Boot and PostgreSQL. It provides RESTful APIs for event management, user authentication, and other core functionalities.

## Tech Stack
- Java 17
- Spring Boot 3.4.4
- PostgreSQL 12.0
- Hibernate/JPA
- Maven

## Prerequisites
- Java 17 or higher
- PostgreSQL 12.0 or higher
- Maven 3.6.3 or higher

## Database Setup
1. Create a PostgreSQL database named `bookmyevent`
2. Update the database credentials in `application.properties` if needed:
   ```
   spring.datasource.url=jdbc:postgresql://localhost:5432/bookmyevent
   spring.datasource.username=postgres
   spring.datasource.password=postgres
   ```

## Running the Application
1. Navigate to the backend directory
2. Run the application using Maven:
   ```bash
   ./mvnw spring-boot:run
   ```
   or
   ```bash
   mvn spring-boot:run
   ```

## API Documentation
The application runs on port 8080 with the base path `/api`. All endpoints are prefixed with this base path.

## Configuration
The application uses the following external services:
- Google OAuth for authentication
- Cloudinary for image storage

Update the respective credentials in `application.properties` before running the application.

## Project Structure
```
src/
├── main/
│   ├── java/
│   │   └── com/example/backend/
│   │       ├── config/        # Configuration classes
│   │       ├── controller/    # REST controllers
│   │       ├── model/         # Entity classes
│   │       ├── repository/    # JPA repositories
│   │       ├── service/       # Business logic
│   │       └── BookmyeventApplication.java
│   └── resources/
│       └── application.properties
└── test/                     # Test classes
```

## Development
- The application uses Hibernate's `update` mode for database schema management
- SQL queries are logged in development mode
- CORS is configured to allow requests from `http://localhost:3000`

## Contributing
1. Fork the repository
2. Create your feature branch
3. Commit your changes
4. Push to the branch
5. Create a new Pull Request 