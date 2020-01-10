module.exports = async (page, i) => {
  const countries = await page.evaluate(() =>
    Array.from(
      document.querySelectorAll(".data-table.chart-bar tbody tr td.label"),
      element => element.innerText
    )
  );

  const weights = await page.evaluate(() =>
    Array.from(
      document.querySelectorAll(".data-table.chart-bar tbody tr td.data"),
      element => element.innerText
    )
  );

  const firstTenCountries = countries.slice(0, 10);
  const firstTenWeights = weights.slice(0, 10);

  const countryWeights = await firstTenCountries.map((country, idx) => {
    return {
      country: country.toString(),
      weight: firstTenWeights[idx],
      EtfFundId: i + 1
    };
  });

  return countryWeights;
};
