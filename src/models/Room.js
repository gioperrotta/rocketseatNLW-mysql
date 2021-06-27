const Sequelize = require('sequelize');
const db = require('./_db');

const Room = db.define('rooms', {
    id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        primaryKey: true,
    },
    pass: {
        type: Sequelize.STRING,
        allowNull: false
    }
});

//Criar a tabela
Room.sync();

module.exports = Room;