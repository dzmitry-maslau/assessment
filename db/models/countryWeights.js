const Sequelize = require("sequelize");
const db = require("../db");

const CountryWeights = db.define("CountryWeights", {
  country: {
    type: Sequelize.STRING
  },
  weight: {
    type: Sequelize.STRING
  }
});

module.exports = CountryWeights;
