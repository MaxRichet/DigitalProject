const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Student = sequelize.define('Student', {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    school: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    like_laws: {
        type: DataTypes.STRING,
        allowNull: true
    },
    social: {
        type: DataTypes.STRING,
        allowNull: true
    },
    portfolio: {
        type: DataTypes.STRING,
        allowNull: true
    }
    }, {
      tableName: 'students',
      timestamps: true
});

sequelize.sync()
  .then(() => {
    console.log('Model Student synchronisé avec la bdd');
  })
  .catch(err => {
    console.error('la synchronisation de la bdd a échoué:', err);
});

module.exports = Student;