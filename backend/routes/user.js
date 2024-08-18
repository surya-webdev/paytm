const express = require("express");
const z = require("zod");
const jwt = require("jsonwebtoken");

const { user, account } = require("../db");
const { jwt_secret } = require("../config");
const {
  authMiddleware,
  updateMiddleware,
  filterMiddleware,
} = require("../middleware");

// const app = express();

// app.use(express.json());

const router = express.Router();

const mySchema = z.object({
  userName: z.string(),
  password: z.string(),
  firstName: z.string(),
  lastName: z.string(),
});

router.post("/signup", async function (req, res, next) {
  //
  const userName = req.body.userName;
  const password = req.body.password;
  const firstName = req.body.firstName;
  const lastName = req.body.lastName;

  const userSchema = mySchema.safeParse(req.body);

  if (
    !userSchema.success ||
    !userName ||
    !password ||
    !firstName ||
    !lastName
  ) {
    res.send({
      messgae: "ERROR",
    });
  } else {
    const existingUser = await user.findOne({ userName });

    if (existingUser) {
      return res.status(411).json({
        message: "Email already taken / Incorrect inputs",
      });
    }

    const user_create = await user.create({
      userName,
      password,
      firstName,
      lastName,
    });

    const userId = user_create?._id;

    const account_create = await account.create({
      userId,
      balance: 1 + Math.random() * 1000,
    });

    const token = jwt.sign({ userId }, jwt_secret);

    return res.send({
      message: "User created successfully",
      token,
    });
  }
});

router.get("/signin", authMiddleware, function (req, res, next) {
  //

  res.send({
    messgae: true,
    user: res.locals.user,
  });
});

router.put("/", updateMiddleware, function (req, res, next) {
  res.send({
    message: "Updated",
  });
});

router.get("/bulk", filterMiddleware, function (req, res, next) {});

router.post("/dashboard", authMiddleware, function (req, res, next) {
  res.send({
    messgae: true,
    user: res.locals.user,
  });
  // to get the current user and other users data
  // able send transfer the money !
});

router.post("/others", authMiddleware, async function (req, res, next) {
  //
  const id = res.locals.user.id;

  try {
    const users = await user.find();

    const filtered = users.filter((user) => user.id !== id);
    res.send({
      users: filtered,
    });

    if (!users || !filtered)
      return res.status(403).json({
        messgae: "NO data's found",
      });
  } catch (error) {
    res.send("ERROR", error);
  }
});

module.exports = router;
