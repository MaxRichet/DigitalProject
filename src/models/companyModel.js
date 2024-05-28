const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Company = sequelize.define('Company', {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    size: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    siret: {
        type: DataTypes.STRING,
        allowNull: false
    }
    }, {
      tableName: 'companies',
      timestamps: true
});

sequelize.sync()
  .then(() => {
    console.log('Model Company synchronisé avec la bdd');
  })
  .catch(err => {
    console.error('la synchronisation de la bdd a échoué:', err);
});

module.exports = Company;