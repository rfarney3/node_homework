const Sequelize = require("sequelize");
const db = require("../config/database");

const Group = db.define("group", {
  name: {
    type: Sequelize.STRING
  },
  id: {
    type: Sequelize.NUMBER,
    primaryKey: true
  },
  permissions: {
      type: Sequelize.ARRAY
  }
})

module.exports = Group;