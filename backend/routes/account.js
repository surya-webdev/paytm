const express = require("express");
const mongoose = require("mongoose");
const { getBalanceMiddleware, authMiddleware } = require("../middleware");
const { account } = require("../db");

const router = express.Router();
// 95 http request

router.post("/balance", getBalanceMiddleware, function (req, res, next) {
  res.send({
    message: "DONE",
  });
});

router.post("/transfer", authMiddleware, async function (req, res, next) {
  //

  const session = await mongoose.startSession();

  await session.startTransaction();

  // current user!!!!!!!

  const userid = res.locals.user.id;
  // const { userid } = req.headers;
  const { to, amount } = req.body;
  //
  const userAccount = await account
    .findOne({ userId: userid })
    .session(session);

  const transferUser = await account.findOne({ userId: to }).session(session);

  // console.log(userAccount);

  if (userAccount.balance < amount) {
    await session.abortTransaction();

    return res.send({
      message: "Insufficient balance",
    });
  }

  if (!userAccount || amount === 0) {
    await session.abortTransaction();

    return res.status(400).json({
      message: "Invalid account",
    });
  }

  await account
    .updateOne({ userId: to }, { balance: transferUser.balance + amount })
    .session(session);
  await account
    .updateOne({ userId: userid }, { balance: userAccount.balance - amount })
    .session(session);

  await session.commitTransaction();

  res.json({
    status: true,
    message: "Transfer successful",
  });
  //
});

module.exports = router;
