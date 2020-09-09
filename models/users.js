const Sequelize = require("sequelize");
const db = require("../config/db");

const Users = db.define(
  "users",
  {
    username: { type: Sequelize.STRING },
    email: { type: Sequelize.STRING },
    password: { type: Sequelize.STRING },
  },
  {
    freezeTableName: true,
  }
);

module.exports = Users;
