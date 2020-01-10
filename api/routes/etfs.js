const router = require("express").Router();
const {
  EtfFunds /*,
  Holdings,
  CountryWeights,
  SectorWeights */
} = require("../../db/models");

const { authenticateToken } = require("../auth/auth");

module.exports = router;

router.get("/", authenticateToken, async (req, res, next) => {
  try {
    const funds = await EtfFunds.findAll();
    res.json(funds);
  } catch (err) {
    next(err);
  }
});

router.get("/:ticker", authenticateToken, async (req, res, next) => {
  try {
    const singleEtf = await EtfFunds.findAll({
      where: {
        fundTicker: req.params.ticker
      },
      include: { all: true }
    });
    res.json(singleEtf);
  } catch (err) {
    next(err);
  }
});
