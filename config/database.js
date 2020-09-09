const { Sequelize } = require('sequelize');
module.exports = new Sequelize('nodehw', 'ryanfarney', 'Aspen4223!', {
  host: 'localhost',
  dialect: 'postgres'
});
