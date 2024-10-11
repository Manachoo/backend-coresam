# Establecer la imagen base de Node.js
FROM node:16-alpine

# Establecer el directorio de trabajo dentro del contenedor
WORKDIR /usr/src/app

# Copiar los archivos package.json y package-lock.json al contenedor
COPY package*.json ./

# Instalar las dependencias del proyecto
RUN npm install

# Copiar el resto del código fuente al contenedor
COPY . .

# Exponer el puerto en el que correrá la aplicación (el mismo que uses en Express)
EXPOSE 4000

# Comando para iniciar la aplicación
CMD ["npm", "start"]
