const { DataTypes } = require('sequelize');

module.exports = (sequelizeInstance) => {
  return sequelizeInstance.define('raspberrys', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    port: {
      type: DataTypes.INTEGER,
      allowNull: false,
      unique: true,
    },
  }, {
    tableName: 'raspberry',
    timestamps: true,
  });
};
