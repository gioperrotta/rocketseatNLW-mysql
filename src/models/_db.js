const Sequelize = require('sequelize');

const sequelize = new Sequelize('rocketq', 'root', 'Gp689356', {
    host: 'localhost',
    dialect: 'mysql'
});

module.exports = sequelize;