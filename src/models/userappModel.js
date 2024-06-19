const { DataTypes } = require('sequelize');
const sequelize = require('../config/database.js');

const Userapp = sequelize.define('Userapp', {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    cv: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    portfolio: {
        type: DataTypes.STRING,
        allowNull: false
    }
    }, {
      tableName: 'user_applications',
      timestamps: true
});

const User = require('./userModel.js');
User.hasMany(Userapp, { foreignKey: 'user_student_id' });
Userapp.belongsTo(User, { foreignKey: 'user_student_id' });

const Jobads = require('./jobadsModel.js');
Jobads.hasMany(Userapp, { foreignKey: 'job_ad_id' });
Userapp.belongsTo(Jobads, { foreignKey: 'job_ad_id' });

sequelize.sync()
  .then(() => {
    console.log('Model Userapp synchronisé avec la bdd');
  })
  .catch(err => {
    console.error('la synchronisation de la bdd a échoué:', err);
});

module.exports = Userapp;