# Proyecto WeWash - Grupo 9

## Descripción
Este proyecto es parte del programa Codo a Codo y ha sido desarrollado por el Grupo 9. 

WeWash es una aplicación web diseñada para gestionar lavanderías, ofreciendo a los usuarios la comodidad de programar y gestionar servicios de lavado/planchado de ropa desde cualquier dispositivo.

Además, permite a los proveedores de servicios de lavandería registrarse y ofrecer sus servicios a través de la plataforma.

Como parte del proyecto BackEnd, se ha implementado la gestión de usuarios que incluye operaciones CRUD (Crear, Leer, Actualizar, Eliminar), integrado tanto en el FrontEnd como en el BackEnd del sistema.


## Integrantes
- Apaz, Melisa
- Baez, Jorgelina
  
## Estructura del Proyecto

El proyecto está dividido en dos carpetas principales: `backend` y `frontend`.

### Backend

El backend de la aplicación está construido con Node.js, Express y Sequelize, y se conecta a una base de datos MySQL. La estructura de carpetas del backend es la siguiente:

```
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
```

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
```

### Frontend

El frontend de la aplicación está construido con HTML, CSS, JavaScript, Bootstrap y jQuery. La estructura de carpetas del frontend es la siguiente:
```
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
```

#### Conexión entre Frontend y Backend

El archivo usuarios.js en el frontend maneja las solicitudes al backend. Aquí hay un ejemplo de cómo listar usuarios desde el frontend:

```
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
```

#### Configuración del Proyecto

1. Clona el repositorio:

```
git clone https://github.com/CodoACodo2024/Grupo9.git
```

2. Navega al directorio del backend e instala las dependencias:

```
cd Grupo9/Backend
npm install
```
3. Crea una base de datos llamada: wewashdb

4. Realiza la migración de los modelos:

```
npx sequelize-cli db:migrate 
```
   
5. Configura el archivo .env con las variables de entorno necesarias para la base de datos. Por ejemplo:

```
DB_USER=root
DB_PASSWORD=root
DB_NAME=wewashdb
DB_NAME_TEST=wewashdb_test
DB_NAME_PROD=root_production
DB_HOST=127.0.0.1
```

7. Inicia el servidor del backend:
   
```
npm start
```

5. Abre index.html en el navegador para ver la interfaz de usuario.

#### Contribuciones

Si se desea contribuir a este proyecto, por favor sigue estos pasos:

1. Realizar un fork del proyecto.
2. Crear una nueva rama (git checkout -b feature/nueva-funcionalidad).
3. Realizar los cambios y hacer commit (git commit -am 'Descripción del cambio').
4. Realizar push a la rama (git push origin feature/nueva-funcionalidad).
5. Solicitar un Pull Request.

## Video demostración
