const { Sequelize } = require('sequelize');
const config = require('config');
const db = config.get('mongoURI');

module.exports = new Sequelize('nodehw', 'ryanfarney', db, {
  host: 'localhost',
  dialect: 'postgres'
});
