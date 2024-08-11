const express = require("express");

const { getBalanceMiddleware, authMiddleware } = require("../middleware");

const router = express.Router();

router.get(
  "/balance",
  authMiddleware,
  getBalanceMiddleware,
  function (req, res, next) {
    res.send({
      message: "DONE",
    });
  }
);

module.exports = router;
