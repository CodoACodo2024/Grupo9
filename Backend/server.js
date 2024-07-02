const { Sequelize } = require('sequelize');
const config = require('./config/config.json');

const express = require('express');
const app = express();
const port = 3000;

app.get('/', (req, res) => {
    res.send('Petición');
  });
  
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
    console.log('La conexión se ha establecido exitosamente.');
  } catch (error) {
    console.error('No se puede conectar a la base de datos:', error);
  }
})();
