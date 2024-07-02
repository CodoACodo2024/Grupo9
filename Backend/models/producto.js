// models/producto.js
module.exports = (sequelize, DataTypes) => {
  const Producto = sequelize.define('Producto', {
      nombre: {
          type: DataTypes.STRING,
          allowNull: false
      },
      precio: {
          type: DataTypes.FLOAT,
          allowNull: false
      }
  }, {});
  Producto.associate = function(models) {
      // Asociaciones
  };
  return Producto;
};
