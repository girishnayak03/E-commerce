@echo off
echo ====================================================
echo Starting ShopScale Fabric Local Environment
echo ====================================================
echo Make sure you have MongoDB, PostgreSQL, Redis, Kafka
echo running locally on native ports.
echo ====================================================

echo [1/10] Starting Config Server (Port 8888)...
start "Config Server" /D "%~dp0config-server" cmd /k "mvn clean spring-boot:run"
ping 127.0.0.1 -n 9 > nul

echo [2/10] Starting Eureka Server (Port 8761)...
start "Eureka Server" /D "%~dp0eureka-server" cmd /k "mvn clean spring-boot:run"
ping 127.0.0.1 -n 11 > nul

echo [3/10] Starting API Gateway (Port 8080)...
start "API Gateway" /D "%~dp0api-gateway" cmd /k "mvn clean spring-boot:run"

echo [4/10] Starting Product Service (Port 8081)...
start "Product Service" /D "%~dp0product-service" cmd /k "mvn clean spring-boot:run"

echo [5/10] Starting Order Service (Port 8082)...
start "Order Service" /D "%~dp0order-service" cmd /k "mvn clean spring-boot:run"

echo [6/10] Starting Inventory Service (Port 8083)...
start "Inventory Service" /D "%~dp0inventory-service" cmd /k "mvn clean spring-boot:run"

echo [7/10] Starting Review Service (Port 8084)...
start "Review Service" /D "%~dp0review-service" cmd /k "mvn clean spring-boot:run"

echo [8/10] Starting Checkout Service (Port 8085)...
start "Checkout Service" /D "%~dp0checkout-service" cmd /k "mvn clean spring-boot:run"

echo [9/10] Starting Customer Service (Port 8086)...
start "Customer Service" /D "%~dp0customer-service" cmd /k "mvn clean spring-boot:run"

echo [10/10] Starting Frontend (Port 5173)...
start "Frontend" /D "%~dp0frontend" cmd /k "npm run dev"

echo All services initiated! Check the individual command prompt windows for logs.
pause
