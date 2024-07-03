const { Sequelize } = require('sequelize');
const config = require('./config/config.json');

const express = require('express');
//const { sequelize } = require('./models');

const app = express();
const port = 3000;

const routes = require('./routes');
app.use(express.json());
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
