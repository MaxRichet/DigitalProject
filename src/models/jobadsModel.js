const { DataTypes } = require('sequelize');
const sequelize = require('../config/database.js');

const Jobads = sequelize.define('Jobads', {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    title: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    description: {
        type: DataTypes.STRING,
        allowNull: false
    },
    searched_profil: {
        type: DataTypes.STRING,
        allowNull: false
    },
    category: {
        type: DataTypes.STRING,
        allowNull: false
    },
    why_join_us: {
        type: DataTypes.STRING,
        allowNull: true
    },
    location: {
        type: DataTypes.STRING,
        allowNull: true
    },
    duration: {
        type: DataTypes.STRING,
        allowNull: true
    },
    salary: {
        type: DataTypes.STRING,
        allowNull: true
    },
    remote: {
        type: DataTypes.STRING,
        allowNull: true
    },
    xp: {
        type: DataTypes.STRING,
        allowNull: true
    },
    degree: {
        type: DataTypes.STRING,
        allowNull: true
    }
    }, {
      tableName: 'job_ads',
      timestamps: true
});

const User = require('./userModel.js');
User.hasMany(Jobads, { foreignKey: 'user_company_id' });
Jobads.belongsTo(User, { foreignKey: 'user_company_id' });

sequelize.sync()
  .then(() => {
    console.log('Model Jobads synchronisé avec la bdd');
  })
  .catch(err => {
    console.error('la synchronisation de la bdd a échoué:', err);
});

module.exports = Jobads;