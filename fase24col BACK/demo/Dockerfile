# Etapa 1: Build con Maven
FROM maven:3.9.6-eclipse-temurin-17 AS builder

WORKDIR /app

# Establecer variables de entorno para codificación
ENV LANG=C.UTF-8
ENV LC_ALL=C.UTF-8

# Copiamos el archivo pom.xml y descargamos dependencias
COPY pom.xml .

# Copiamos el resto del código fuente
COPY src ./src

# Compilamos el proyecto y generamos el .jar con codificación explícita
RUN mvn clean package -DskipTests -Dfile.encoding=UTF-8 -Dproject.build.sourceEncoding=UTF-8

# Etapa 2: Imagen final
FROM eclipse-temurin:17-jdk

WORKDIR /app

# Copiamos el .jar desde la imagen anterior
COPY --from=builder /app/target/*.jar app.jar

# Exponemos el puerto (modifica si usas otro)
EXPOSE 8080

# Comando para ejecutar tu app
ENTRYPOINT ["java", "-jar", "app.jar"]