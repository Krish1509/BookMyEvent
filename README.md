# BookMyEvent:

Your one-stop platform to book venues, vendors, and perfect every celebration.

# Building....
https://docs.google.com/document/d/1BWX3vokUXdPTIpG1Lr8OGauAyY2GTLkRDizCpz0oq-U/edit?usp

---------------------------------------------------

# Rules:
https://chatgpt.com/canvas/shared/67fc07581d1481919d00f5c0223b921b

----------------------------------------------------

# Backend:
1. cd backend
2. ./mvnw spring-boot:run
3. add application.properties :

        # Application name
        spring.application.name=bookmyevent

        # Database Configuration
        spring.datasource.url=
        spring.datasource.username=
        spring.datasource.password=
        spring.datasource.driver-class-name=org.postgresql.Driver

        # JPA/Hibernate Configuration
        spring.jpa.hibernate.ddl-auto=update
        spring.jpa.show-sql=true
        spring.jpa.properties.hibernate.format_sql=true
        spring.jpa.properties.hibernate.dialect=org.hibernate.dialect.PostgreSQLDialect

        # Server Configuration
        server.port=8080

        # Logging Configuration
        logging.level.org.springframework=INFO
        logging.level.com.example=DEBUG

        # Spring MVC Configuration
        spring.mvc.pathmatch.matching-strategy=ant-path-matcher
        spring.mvc.view.prefix=
        spring.mvc.view.suffix=
        spring.main.web-application-type=servlet

        # Other Settings
        spring.main.allow-circular-references=true

        # Google OAuth2 Configuration
        spring.security.oauth2.client.registration.google.client-id=
        spring.security.oauth2.client.registration.google.client-secret=
        spring.security.oauth2.client.registration.google.scope=email,profile

        # Session Configuration
        server.servlet.session.timeout=30m

        # Cloudinary Configuration
        cloudinary.cloud-name=
        cloudinary.api-key=
        cloudinary.api-secret=
        cloudinary.secure=true 

4. open: http://localhost:8080

# Backend Folder stucture
    backend/
    ├── .gitignore                   # Git ignore file
    ├── .gitattributes              # Git attributes file
    ├── .mvn/                       # Maven wrapper directory
    ├── mvnw                        # Maven wrapper script (Unix)
    ├── mvnw.cmd                    # Maven wrapper script (Windows)
    ├── pom.xml                     # Maven project configuration
    └── src/
        ├── main/
        │   ├── java/
        │   │   └── com/
        │   │       └── example/
        │   │           └── backend/
        │   │               ├── BookmyeventApplication.java  # Main application class
        │   │               ├── config/                      # Configuration classes
        │   │               ├── controller/                  # REST controllers
        │   │               ├── model/                       # Data models/entities
        │   │               ├── repository/                  # Data repositories
        │   │               └── service/                     # Business logic services
        │   └── resources/
        │       └── application.properties    # Application configuration
        └── test/      

----------------------------------------------------

# Frontend:
1. cd frontend
2. npm i
3. npm run dev
4. add .env : 
        NEXT_PUBLIC_API_URL=http://localhost:8080
5. open : http://localhost:3000

# Frontend Folder stucture
    frontend/
    ├── app/
    │   ├── components/
    │   │   └── ProtectedRoute.tsx      # Authentication wrapper component
    │   ├── hooks/
    │   │   └── useAuth.ts             # Authentication hook
    │   ├── login/
    │   │   ├── layout.tsx             # Login page layout
    │   │   └── page.tsx              # Login page component
    │   ├── services/
    │   │   └── auth.ts               # Authentication service
    │   ├── page.tsx                  # Main home page
    │   └── layout.tsx                # Root layout
    ├── public/                       # Static assets
    │   ├── file.svg
    │   ├── globe.svg
    │   ├── google-icon.svg
    │   ├── next.svg
    │   ├── vercel.svg
    │   └── window.svg
    ├── package.json                  # Project dependencies
    ├── package-lock.json            # Lock file for dependencies
    ├── postcss.config.mjs           # PostCSS configuration
    ├── tsconfig.json                # TypeScript configuration



