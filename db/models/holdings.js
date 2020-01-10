const Sequelize = require("sequelize");
const db = require("../db");

const Holdings = db.define("Holdings", {
  holding: {
    type: Sequelize.STRING
  },
  weight: {
    type: Sequelize.STRING
  }
});

module.exports = Holdings;
