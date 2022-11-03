const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  const Shipment = sequelize.define('Shipment', {
    waybill: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: DataTypes.INTEGER
    },
    customerAddress: {
      type: DataTypes.STRING,
      allowNull: false
    },
    customerName: {
      type: DataTypes.STRING,
      allowNull: false
    },
    customerPhoneNumber: {
      type: DataTypes.STRING,
      allowNull: false
    }
  });

  return Shipment;
};
