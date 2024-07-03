'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Reserva extends Model {
    static associate(models) {
      Reserva.belongsTo(models.Usuario, { foreignKey: 'usuario_id' });
      Reserva.belongsTo(models.Lavanderia, { foreignKey: 'lavanderia_id' });
    }
  }
  Reserva.init({
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
    fecha: {
      type: DataTypes.DATE
    },
    hora: {
      type: DataTypes.TIME
    },
    estado: {
      type: DataTypes.ENUM('pendiente', 'confirmada', 'cancelada'),
      defaultValue: 'pendiente' 
    },
    createdAt: {
      allowNull: false,
      type: DataTypes.DATE
    },
    updatedAt: {
      allowNull: false,
      type: DataTypes.DATE
    }
  }, {
    sequelize,
    modelName: 'Reserva',
  });
  return Reserva;
};
