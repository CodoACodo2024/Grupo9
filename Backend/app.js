const { Sequelize } = require('sequelize');
const config = require('./config/config.json');
const express = require('express');
const path = require('path');
const routes = require('./routes');
const cors = require('cors'); 
const app = express();
const port = 3000;

//CORS
app.use(cors());

//Parsear JSON
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//Archivos estáticos desde frontEnd
app.use(express.static(path.join(__dirname, '../FrontEnd')));

//Rutas
app.use('/', routes);

app.listen(port, () => {
  console.log(`Server corriendo en http://localhost:${port}/`);
});

const sequelize = new Sequelize(config.development.database, config.development.username, config.development.password, {
  host: config.development.host,
  dialect: config.development.dialect
});

(async () => {
  try {
    await sequelize.authenticate();
    console.log('La conexión se ha establecido exitosamente. BD:' + config.development.database);
  } catch (error) {
    console.error('No se puede conectar a la base de datos:', error);
  }
})();
