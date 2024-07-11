# Proyecto WeWash - Grupo 9

## Descripción
Este proyecto es parte del programa Codo a Codo y ha sido desarrollado por el Grupo 9. WeWash es una aplicación web para gestionar lavanderías, permitiendo a los usuarios crear, leer, actualizar y eliminar (CRUD) registros de usuarios.

## Integrantes
- Apaz, Melisa
- Baez, Jorgelina
  
## Estructura del Proyecto

El proyecto está dividido en dos carpetas principales: `backend` y `frontend`.

### Backend

El backend de la aplicación está construido con Node.js, Express y Sequelize, y se conecta a una base de datos MySQL. La estructura de carpetas del backend es la siguiente:

Backend/
│
├── config/
│ ├── config.js
│ └── database.js
│
├── controllers/
│ ├── index.js
│ └── usuarioController.js
│
├── migrations/
│
├── models/
│ ├── index.js
│ └── usuario.js
│
├── routes/
│ ├── index.js
│ └── usuarioRoutes.js
│
├── .env
├── app.js
├── package.json
└── README.md

#### Dependencias

El archivo `package.json` en el backend incluye las siguientes dependencias:

```json
{
  "name": "grupo9",
  "version": "1.0.0",
  "description": "Repositorio para Codo a Codo - Equipo",
  "main": "app.js",
  "scripts": {
    "start": "node app.js"
  },
  "dependencies": {
    "bcryptjs": "^2.4.3",
    "body-parser": "^1.20.2",
    "cors": "^2.8.5",
    "dotenv": "^16.4.5",
    "express": "^4.19.2",
    "jsonwebtoken": "^9.0.2",
    "mysql2": "^3.10.2",
    "sequelize": "^6.37.3"
  }
}

### Frontend

El frontend de la aplicación está construido con HTML, CSS, JavaScript, Bootstrap y jQuery. La estructura de carpetas del frontend es la siguiente:

frontend/
│
├── assets/
│   ├── css/
│   │   └── styles.css  
│   ├── fonts/
│   ├── icons/
│   ├── img/
│   ├── js/
│   │   ├── scripts.js  
│   │   └── usuarios.js  
│
├── pages/
│   ├── formulario.html
│   └── index.html

#### Conexión entre Frontend y Backend

El archivo usuarios.js en el frontend maneja las solicitudes al backend. Aquí hay un ejemplo de cómo listar usuarios desde el frontend:

function listarUsuarios() {
    fetch('http://localhost:3000/usuarios')
        .then(response => response.json())
        .then(data => {
            // Mostrar los datos de usuarios
        })
        .catch(error => {
            console.error('Error:', error);
        });
}

#### Configuración del Proyecto

1. Clona el repositorio:

git clone https://github.com/CodoACodo2024/Grupo9.git

2. Navega al directorio del backend e instala las dependencias:

cd Grupo9/Backend
npm install

3. Configura el archivo .env con las variables de entorno necesarias para la base de datos.

4. Inicia el servidor del backend:

npm start

5. Abre index.html en el navegador para ver la interfaz de usuario.

#### Contribuciones

Si deseas contribuir a este proyecto, por favor sigue estos pasos:

1. Haz un fork del proyecto.
2. Crea una nueva rama (git checkout -b feature/nueva-funcionalidad).
3. Realiza tus cambios y haz commit (git commit -am 'Añade nueva funcionalidad').
4. Haz push a la rama (git push origin feature/nueva-funcionalidad).
5. Abre un Pull Request.
