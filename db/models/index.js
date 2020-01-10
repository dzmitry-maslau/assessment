const EtfFunds = require("./etfFunds");
const Holdings = require("./holdings");
const CountryWeights = require("./countryWeights");
const SectorWeights = require("./sectorWeights");

EtfFunds.hasMany(Holdings, { as: "holdings" });
EtfFunds.hasMany(CountryWeights, { as: "countryWeights" });
EtfFunds.hasMany(SectorWeights, { as: "sectorWeights" });

module.exports = {
  EtfFunds,
  Holdings,
  CountryWeights,
  SectorWeights
};
