# BookMyEvent:

Your one-stop platform to book venues, vendors, and perfect every celebration.

----------------------------------------------------
# Root:
1 .env :

#PostgreSQL
SPRING_DATASOURCE_URL=jdbc:postgresql://postgres:5432/bookmyevent
SPRING_DATASOURCE_USERNAME=
SPRING_DATASOURCE_PASSWORD=

#Google OAuth
GOOGLE_CLIENT_ID=
GOOGLE_CLIENT_SECRET=

#Cloudinary
CLOUDINARY_CLOUD_NAME=
CLOUDINARY_API_KEY=
CLOUDINARY_API_SECRET=

# Backend:
1. cd backend
2. ./mvnw spring-boot:run
3. open: http://localhost:8080

----------------------------------------------------

# Frontend:
1. cd frontend
2. npm i
3. npm run dev
4. add .env : NEXT_PUBLIC_API_URL=http://localhost:8080
5. open : http://localhost:3000
-------------------------------------------------------

# Run both Server
1. Make sure cd BookMyEvent (root)
2. npm i
3. npm run both

# Docker:
1. docker-compose up --build
