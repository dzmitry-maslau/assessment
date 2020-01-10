const path = require("path");
const express = require("express");
const morgan = require("morgan");
const db = require("./db");
const PORT = process.env.PORT || 8080;
const app = express();
const { generateAccessToken } = require("./api/auth/auth");
const cron = require("node-cron");

const {
  EtfFunds,
  Holdings,
  CountryWeights,
  SectorWeights
} = require("./db/models");
const { scrapingFunc } = require("./scraping/index.js");

module.exports = app;

const createApp = () => {
  // logging middleware
  app.use(morgan("dev"));

  // body parsing middleware
  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));

  app.post("/login", (req, res) => {
    // Authenticate User

    const username = req.body.username;
    const user = { name: username };
    const accessToken = generateAccessToken(user);
    res.json({ accessToken: accessToken });
  });

  // auth and api routes
  app.use("/api", require("./api"));

  // static file-serving middleware
  app.use(express.static(path.join(__dirname, "..", "public")));

  // any remaining requests with an extension (.js, .css, etc.) send 404
  app.use((req, res, next) => {
    if (path.extname(req.path).length) {
      const err = new Error("Not found");
      err.status = 404;
      next(err);
    } else {
      next();
    }
  });

  // sends index.html
  app.use("*", (req, res) => {
    res.sendFile(__dirname + "/public/index.html");
  });

  // error handling endware
  app.use((err, req, res, next) => {
    console.error(err);
    console.error(err.stack);
    res.status(err.status || 500).send(err.message || "Internal server error.");
  });
};

const startListening = () => {
  // start listening (and create a 'server' object representing our server)
  app.listen(PORT, () => {
    console.log(`Parser server mixing it up on port ${PORT}`);
    scheduleParsing();
  });
};

async function bootApp() {
  await createApp();
  await startListening();
}

bootApp();

const scheduleParsing = () => {
  cron.schedule("0 * * * *", () => {
    console.log("parsing funds every hour");
    parseFunds();
  });
};

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
