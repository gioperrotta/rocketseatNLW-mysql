const Sequelize = require('sequelize');
const db = require('./_db');

const Question = db.define('rooms', {
  id: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    allowNull: false,
    primaryKey: true,
  },
  titulo: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  read: {
    type: Sequelize.SMALLINT
  },
  roomId: {
    type: Sequelize.INTEGER,
    allowNull: false
  }
});

//Criar a tabela
Question.sync();

module.exports = Question;

