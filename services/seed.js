const parseFunds = async () => {
  await db.sync({ force: true });

  const {
    allEtfsWithDescr,
    allHoldings,
    allCountryWeights,
    allSectorWeights
  } = await scrapingFunc();

  await Promise.all(
    allEtfsWithDescr.map(fund => {
      return EtfFunds.create(fund);
    })
  );

  await Promise.all(
    allHoldings.map(fund => {
      return Holdings.create(fund);
    })
  );

  await Promise.all(
    allCountryWeights.map(fund => {
      return CountryWeights.create(fund);
    })
  );

  await Promise.all(
    allSectorWeights.map(fund => {
      return SectorWeights.create(fund);
    })
  );

  console.log("Saved!");
};

module.exports = {
  parseFunds
};
