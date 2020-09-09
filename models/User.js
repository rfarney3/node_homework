const Sequelize = require("sequelize");
const db = require("../config/database");

const User = db.define("user", {
  login: {
    type: Sequelize.STRING
  },
  password: {
    type: Sequelize.STRING
  },
  age: {
    type: Sequelize.NUMBER
  },
  isDeleted: {
    type: Sequelize.BOOLEAN
  },
  id: {
    type: Sequelize.NUMBER,
    primaryKey: true
  },
})

module.exports = User;