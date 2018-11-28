var sequelize = require("../../sequelize");
const Sequelize = require("sequelize");

//User model
const User = sequelize.define(
  "users",
  {
    username: Sequelize.STRING,
    email: Sequelize.STRING,
    password: Sequelize.STRING,
    created_at: Sequelize.DATE
  },
  {
    timestamps: false
  }
);

module.exports = User;
