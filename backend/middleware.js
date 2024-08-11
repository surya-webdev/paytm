const jwt = require("jsonwebtoken");

const { jwt_secret } = require("./config");

const { user, account } = require("./db");

async function authMiddleware(req, res, next) {
  const userId = req.headers.id;

  const auth = req.headers.authorization;

  if (!auth || !auth.startsWith("Bearer")) {
    res.status("404").json({});
  }

  const token = auth.split(" ").at(1);

  try {
    const decode = jwt.verify(token, jwt_secret);

    const users = await user.findOne({ _id: decode.userId });

    next();

    //
  } catch {
    res.status(403).json({
      message: "ERROR ",
    });
  }
}

async function updateMiddleware(req, res, next) {
  //
  const userName = req.body.userName;
  const password = req.body.password;
  const firstName = req.body.firstName;
  const lastName = req.body.lastName;

  if (!password || !userName)
    return res.status(403).json({
      message: "Please provide a correct input",
    });

  const existingUser = await user.findOne({ userName });
  console.log(existingUser);
  if (!existingUser)
    return res.send({
      Message: "Couldn't find the user , please the username:(",
    });

  await user.updateOne(
    { _id: existingUser?._id },
    { password, firstName, lastName }
  );

  next();
}

async function filterMiddleware(req, res, next) {
  const filter = req.query.filter || "";

  if (!filter)
    return res.send({
      Message: "please enter the userName :(",
    });

  try {
    const users = await user.find({ firstName: filter });
    res.send({
      users: users.map((item) => {
        return {
          id: item._id,
          firstName: item.firstName,
          lastName: item.lastName,
        };
      }),
    });
  } catch {
    res.send({ Message: "Couldn't find the user " });
  }
}

// account

async function getBalanceMiddleware(req, res, next) {
  const userId = req.headers.userid;

  try {
    const user = await account.findOne({ userId });

    if (!userId || !user) {
      res.send({ Message: "Couldn't find the balace of the user " });
    }

    res.send({
      balance: user.balance,
    });
  } catch {
    res.send({ Message: "Couldn't find the user " });
  }
}

// transfer

module.exports = {
  authMiddleware,
  updateMiddleware,
  filterMiddleware,
  getBalanceMiddleware,
};
