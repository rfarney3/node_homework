const Sequelize = require("sequelize");
const User = require("./User")
const Group = require("./Group")
const db = require("../config/database");

const User_Group = db.define("user_group", {})

User.belongsToMany(Group, { through: User_Group });
Group.belongsToMany(User, { through: User_Group });

module.exports = Group;