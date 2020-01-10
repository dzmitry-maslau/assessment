const Sequelize = require("sequelize");
const db = require("../db");

const SectorWeights = db.define("SectorWeights", {
  sector: {
    type: Sequelize.STRING
  },
  weight: {
    type: Sequelize.STRING
  }
});

module.exports = SectorWeights;
