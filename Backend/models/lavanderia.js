'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Lavanderia extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Lavanderia.init({
    usuario_id: DataTypes.INTEGER,
    nombre: DataTypes.STRING,
    descripcion: DataTypes.TEXT,
    direccion: DataTypes.STRING,
    telefono: DataTypes.STRING,
    horario: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Lavanderia',
  });
  return Lavanderia;
};