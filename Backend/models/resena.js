'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Resena extends Model {
    static associate(models) {
      Resena.belongsTo(models.Usuario, { foreignKey: 'usuario_id' });
      Resena.belongsTo(models.Lavanderia, { foreignKey: 'lavanderia_id' });
    }
  }
  Resena.init({
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    usuario_id: {
      type: DataTypes.INTEGER,
      references: {
        model: 'Usuarios',
        key: 'id'
      },
      onUpdate: 'CASCADE',
      onDelete: 'CASCADE'
    },
    lavanderia_id: {
      type: DataTypes.INTEGER,
      references: {
        model: 'Lavanderias',
        key: 'id'
      },
      onUpdate: 'CASCADE',
      onDelete: 'CASCADE'
    },
    puntaje: {
      type: DataTypes.INTEGER,
      validate: {
        min: 1,
        max: 5
      }
    },
    comentario: DataTypes.TEXT,
    createdAt: DataTypes.DATE,
    updatedAt: DataTypes.DATE
  }, {
    sequelize,
    modelName: 'Resena',
  });
  return Resena;
};
