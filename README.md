# 🎓 Gestor de Matrículas

## 🚀 Despliegue

- **Frontend:** Desplegado en **Netlify**  
  🌐 [https://gestormatriculas.netlify.app/](https://gestormatriculas.netlify.app/)  

- **Backend:** Desplegado en **Render** (espera unos momentos hasta que el servidor esté activo)
  
  🔗 [https://render.com](https://render.com)  

      💡 Recuerda configurar las variables de entorno tanto Frontend como Backend

<img width="1108" height="732" alt="image" src="https://github.com/user-attachments/assets/d466dbef-90e1-43b8-8d12-50dcd6b3aea4" />





## 🛠 Tecnologías Utilizadas

- **Frontend:** React, Tailwind CSS  
- **Backend:** Node.js, Express  
- **Base de Datos:** MongoDB  
- **Otras Herramientas:** Mongoose (modelado de datos), JWT (autenticación)



## ✨ Características

- **👨‍🎓 Gestión de Estudiantes:**  
  Crear, visualizar, actualizar y eliminar estudiantes con información como nombre, cédula, correo, teléfono, etc.

- **📚 Gestión de Materias:**  
  Crear, visualizar, actualizar y eliminar materias con código único, créditos y descripción.

- **📝 Gestión de Matrículas:**  
  Asociar estudiantes a materias, calcular créditos totales y gestionar matrículas por usuario.

- **🔒 Autenticación:**   
  Cada usuario solo puede gestionar sus propios registros (estudiantes, materias, matrículas).

- **✅ Validaciones:**
  Cédulas, correos y teléfonos pueden repetirse entre diferentes usuarios, pero **no pueden repetirse dentro del mismoo usuario**.   



## 💻 Requisitos Previos

- Node.js 
- MongoDB (instalado localmente o conexión a MongoDB Atlas)  
- npm 
- Un navegadorde tu preferencia



## ⚡ Instalación y Configuración


El proyecto está dividido en dos carpetas: **Backend** y **Frontend**. Sigue estos pasos para configurar y ejecutar la aplicación localmente:

### 1️⃣ Clonar el Repositorio

    git clone <URL_DEL_REPOSITORIO>
    cd GestionMatriculas-master


### 2️⃣ Configurar el Backend

    cd Backend
    npm install

Crea un archivo .env en la carpeta Backend con las siguientes variables:

    MONGO_URI_LOCAL=<tu_conexion_mongodb>
    JWT_SECRET=<tu_secreto_jwt>
    PORT=3000

Inicia el servidor backend:

    npm start

### 3️⃣ Configurar del Frontend

    cd ../Frontend
    npm install

Crea un archivo .env en la carpeta Backend con las siguientes variables:

    VITE_URL_BACKEND =http://localhost:3000

Iniciar el frontend:

    npm start


### 📬 Contactame
Si tienes dudas o sugerencias, contáctame en mi LinkedIn
