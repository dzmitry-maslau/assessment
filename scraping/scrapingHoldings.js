module.exports = async (page, i) => {
  const holdings = await page.evaluate(() =>
    Array.from(
      document.querySelectorAll(".fund-top-holdings tbody tr .label"),
      element => element.innerText
    )
  );

  const weights = await page.evaluate(() =>
    Array.from(
      document.querySelectorAll(".fund-top-holdings tbody tr .weight"),
      element => element.innerText
    )
  );

  const firstTenHoldings = holdings.slice(0, 10);
  const firstTenWeights = weights.slice(0, 10);

  const etfHoldings = await firstTenHoldings.map((holding, idx) => {
    return {
      holding: holding.toString(),
      weight: firstTenWeights[idx],
      EtfFundId: i + 1
    };
  });

  return etfHoldings;
};
