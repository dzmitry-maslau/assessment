const puppeteer = require("puppeteer");
const scrapingMainPage = require("./scrapingMainPage.js");
const scrapingHoldings = require("./scrapingHoldings.js");
const scrapingDescription = require("./scrapingDescription.js");
const scrapingCountryWeights = require("./scrapingCountryWeights.js");
const scrapingSectorWeights = require("./scrapingSectorWeights.js");

const scrapingFunc = async () => {
  const browser = await puppeteer.launch({ args: ["--no-sandbox"] });
  const page = await browser.newPage();

  const navigationPromise = page.waitForNavigation();

  console.log("Starting to parse..");

  await page.goto("https://www.spdrs.com/product/fund.seam?ticker=SPY");

  await page.setViewport({ width: 1262, height: 748 });

  await page.waitForSelector(
    ".page > .ssmp-header > .ssmp-mobile-header__container > .ssmp-modal__self-identifier-page"
  );
  await page.click(
    ".page > .ssmp-header > .ssmp-mobile-header__container > .ssmp-modal__self-identifier-page"
  );

  await page.waitForSelector(
    "#js-ssmp-roleHTML > #individual > .ssmp-form-radio__label > .ssmp-form-radio__description > div:nth-child(1)"
  );
  await page.click(
    "#js-ssmp-roleHTML > #individual > .ssmp-form-radio__label > .ssmp-form-radio__description > div:nth-child(1)"
  );

  await page.waitForSelector(".form-row #js-ssmp-clrButtonLabel");
  await page.click(".form-row #js-ssmp-clrButtonLabel");

  await navigationPromise;

  await page.waitFor(5000);

  let mainPage = await scrapingMainPage(page);

  let links = [];
  for (const fund of mainPage) {
    links.push(fund.link);
  }

  // const mappedLinks = mainPage.map(fund => fund.link);

  let allEtfsWithDescr = [];
  let allHoldings = [];
  let allCountryWeights = [];
  let allSectorWeights = [];

  for (let i = 0; i < links.length; i++) {
    await page.goto(links[i]);

    let description = await scrapingDescription(page);
    let holdings = await scrapingHoldings(page, i);
    let countryWeights = await scrapingCountryWeights(page, i);
    let sectorWeights = await scrapingSectorWeights(page, i);

    allEtfsWithDescr.push({ ...mainPage[i], ...{ description } });
    allHoldings = [...allHoldings, ...holdings];

    // allHoldings.push(...holdings);

    allCountryWeights = [...allCountryWeights, ...countryWeights];
    allSectorWeights = [...allSectorWeights, ...sectorWeights];
  }

  // const promise1 = Promise.resolve(1); // [a, b]
  // const promise2 = Promise.resolve(2); // [1, 2]

  // const res = [];

  // const result = Promise.all(promise1, promise2);

  // for (let i =1; i < 3; i++) {
  //   res.push({
  //     id: result[0][i],
  //     name: result[1][i]
  //   })
  // }

  await browser.close();

  return { allEtfsWithDescr, allHoldings, allCountryWeights, allSectorWeights };
};

module.exports = { scrapingFunc };
