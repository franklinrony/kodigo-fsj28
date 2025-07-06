# 🏨 Alojamiento Kodigo

Este proyecto es una aplicación web desarrollada como parte de la tarea del módulo de React del Bootcamp Fullstack Junior (FSJ28) de Kodigo.

## 📋 Descripción
La aplicación permite gestionar alojamientos y reservaciones, consumiendo una API externa para obtener y manipular los datos. Se ha implementado un interceptor HTTP para agregar automáticamente un token que emula un JWT (JSON Web Token) en las solicitudes, facilitando la autenticación y autorización de las operaciones.

## ✨ Características principales
- 🏠 Gestión de alojamientos y reservaciones.
- 🔗 Consumo de una API REST para operaciones CRUD.
- 🛡️ Interceptor HTTP para agregar un token tipo JWT a cada solicitud.
- 💻 Interfaz moderna y responsiva.

## 🛠️ Tecnologías utilizadas
- ⚛️ **React** (Vite + TypeScript)
- 🎨 **Tailwind CSS**
- 🔌 **Axios** (para consumo de API)
- 🧭 **React Router**
- ☁️ **Cloudinary** (para gestión de imágenes)

## ⚙️ Variables de entorno
1. Copia el archivo `.env.example` y renómbralo como `.env` en la raíz del proyecto.
2. Configura las variables necesarias en el archivo `.env` según tu entorno y la API que vayas a consumir.
   - ⚠️ **Asegúrate de tener configurada la API que se va a consumir o utiliza los endpoints de prueba proporcionados.**

## 🚀 Ejecución del proyecto
1. 📥 Clona el repositorio:
   ```bash
   git clone <URL-del-repositorio>
   ```
2. 📦 Instala las dependencias:
   ```bash
   npm install
   ```
3. ▶️ Inicia el servidor de desarrollo:
   ```bash
   npm run dev
   ```
4. 🌐 Accede a la aplicación en [http://localhost:5173](http://localhost:5173)

## 📝 Notas
- 🛡️ El token JWT es simulado y se agrega automáticamente a las solicitudes mediante un interceptor HTTP ubicado en `src/interceptor/httpInterceptor.ts`.

## 👥 Integrantes del grupo
- 
-
-
-
-
---
Proyecto para la tarea del módulo de React - Bootcamp Fullstack Junior (FSJ28) - Kodigo 🚀 