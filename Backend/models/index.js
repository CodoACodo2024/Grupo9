'use strict';

const { Sequelize, DataTypes } = require('sequelize');
const config = require('../config/config');

const sequelize = new Sequelize(config.development.database, config.development.username, config.development.password, {
  host: config.development.host,
  dialect: config.development.dialect
});

const Usuario = require('./usuario')(sequelize, DataTypes);
const Lavanderia = require('./lavanderia')(sequelize, DataTypes);
const Reserva = require('./reserva')(sequelize, DataTypes);
const Resena = require('./resena')(sequelize, DataTypes);

Usuario.associate({ Lavanderia, Reserva, Resena });
Lavanderia.associate({ Usuario, Reserva, Resena });
Reserva.associate({ Usuario, Lavanderia });
Resena.associate({ Usuario, Lavanderia });

module.exports = {
  sequelize,
  Usuario,
  Lavanderia,
  Reserva,
  Resena
};