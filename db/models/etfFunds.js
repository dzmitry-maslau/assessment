const Sequelize = require("sequelize");
const db = require("../db");

const EtfFunds = db.define("EtfFunds", {
  fundName: {
    type: Sequelize.STRING
  },
  fundTicker: {
    type: Sequelize.STRING
  },
  description: {
    type: Sequelize.TEXT
  },
  TER: {
    type: Sequelize.STRING
  },
  NAV: {
    type: Sequelize.STRING
  },
  AUM: {
    type: Sequelize.STRING
  },
  date: {
    type: Sequelize.STRING
  },
  link: {
    type: Sequelize.STRING
  }
});

module.exports = EtfFunds;
