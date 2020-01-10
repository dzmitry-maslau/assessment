module.exports = async page => {
  const fundNames = await page.evaluate(() =>
    Array.from(
      document.querySelectorAll(
        ".overview > .tabledata > table > tbody > tr > td.fundname"
      ),
      element => element.innerText
    )
  );

  const fundTickers = await page.evaluate(() =>
    Array.from(
      document.querySelectorAll(
        ".overview > .tabledata > table > tbody > tr > td.fundticker"
      ),
      element => element.innerText
    )
  );

  const fundTER = await page.evaluate(() =>
    Array.from(
      document.querySelectorAll(
        ".overview > .tabledata > table > tbody > tr > :nth-child(4)"
      ),
      element => element.innerText
    )
  );

  const fundNAV = await page.evaluate(() =>
    Array.from(
      document.querySelectorAll(
        ".overview > .tabledata > table > tbody > tr > :nth-child(5)"
      ),
      element => element.innerText
    )
  );

  const fundAUM = await page.evaluate(() =>
    Array.from(
      document.querySelectorAll(
        ".overview > .tabledata > table > tbody > tr > :nth-child(6)"
      ),
      element => element.innerText
    )
  );

  const fundDate = await page.evaluate(() =>
    Array.from(
      document.querySelectorAll(
        ".overview > .tabledata > table > tbody > tr > td.sort-date"
      ),
      element => element.innerText
    )
  );

  const fundLinks = await page.evaluate(() =>
    Array.from(
      document.querySelectorAll(
        ".overview > .tabledata > table > tbody > tr > td.fundname > a"
      ),
      element => element.href
    )
  );

  const etfRows = await fundNames.map((fundName, idx) => {
    return {
      fundName: fundName,
      fundTicker: fundTickers[idx],
      TER: fundTER[idx],
      NAV: fundNAV[idx],
      AUM: fundAUM[idx],
      date: fundDate[idx],
      link: fundLinks[idx]
    };
  });

  return etfRows;
};
