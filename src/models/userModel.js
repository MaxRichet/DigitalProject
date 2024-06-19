const { DataTypes } = require('sequelize');
const sequelize = require('../config/database.js');

const User = sequelize.define('User', {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    firstname: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    lastname: {
        type: DataTypes.STRING,
        allowNull: false
    },
    email: {
        type: DataTypes.STRING,
        allowNull: false
    },
    password: {
        type: DataTypes.STRING,
        allowNull: false
    },
    post: {
        type: DataTypes.STRING,
        allowNull: false
    },
    phone: {
        type: DataTypes.STRING,
        allowNull: false
    },
    role: {
        type: DataTypes.STRING,
        allowNull: false
    },
    gender: {
        type: DataTypes.STRING,
        allowNull: false
    }
    }, {
      tableName: 'users',
      timestamps: true
});

const Student = require('./studentModel.js');
Student.hasOne(User, { foreignKey: 'student_id' });
User.belongsTo(Student, { foreignKey: 'student_id' });

const Company = require('./companyModel.js');
Company.hasMany(User, { foreignKey: 'company_id' });
User.belongsTo(Company, { foreignKey: 'company_id' });

sequelize.sync()
  .then(() => {
    console.log('Model User synchronisé avec la bdd');
  })
  .catch(err => {
    console.error('la synchronisation de la bdd a échoué:', err);
});

module.exports = User;