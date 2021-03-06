const path = require("path");
const express = require("express");
const morgan = require("morgan");
const PORT = process.env.PORT || 8080;
const app = express();
const { generateAccessToken } = require("./api/auth/auth");
const cron = require("node-cron");
const { parseFunds } = require("./services/seed");

module.exports = app;

const createApp = () => {
  // logging middleware
  app.use(morgan("dev"));

  // body parsing middleware
  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));

  app.post("/login", (req, res) => {
    const username = req.body.username;
    const user = { name: username };
    const accessToken = generateAccessToken(user);
    res.json({ accessToken: accessToken });
  });

  // api routes
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

const scheduleParsing = () => {
  cron.schedule("30 22 * * *", () => {
    console.log("parsing funds every day");
    parseFunds();
  });
};

async function bootApp() {
  await createApp();
  await startListening();
}

bootApp();
