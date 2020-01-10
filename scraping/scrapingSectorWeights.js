module.exports = async (page, i) => {
  const sectors = await page.evaluate(() =>
    Array.from(
      document.querySelectorAll(
        ".fund-sector-breakdown .data-table tbody tr td.label"
      ),
      element => element.innerText
    )
  );

  const weights = await page.evaluate(() =>
    Array.from(
      document.querySelectorAll(
        ".fund-sector-breakdown .data-table tbody tr td.data"
      ),
      element => element.innerText
    )
  );

  const firstTenSectors = sectors.slice(0, 10);
  const firstTenSectorWeights = weights.slice(0, 10);

  const sectorWeights = await firstTenSectors.map((sector, idx) => {
    return {
      sector: sector.toString(),
      weight: firstTenSectorWeights[idx],
      EtfFundId: i + 1
    };
  });

  return sectorWeights;
};
