const Sequelize = require('sequelize');
const db = require('../db');

const Source = db.define('source', {
  name: {
    type: Sequelize.STRING,
    allowNull: false,
  },
});

module.exports = Source;
