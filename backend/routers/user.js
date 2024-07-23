const express = require("express");
const router = express.Router();

const zod = require("zod");
const jwt = require("jsonwebtoken");

const { User, Account } = require("../db");
const JWT_SECRET = require("../config");
const { authMiddleware } = require("../middleware");

router.get("/", (req, res) => {
  res.send("User Say Hello ");
});

const signupSchema = zod.object({
  username: zod.string(),
  password: zod.string(),
  firstname: zod.string(),
  lastname: zod.string(),
});

router.post("/signup", async (req, res) => {
  const body = req.body;
  const { success } = signupSchema.safeParse(body);
  if (!success) return res.status(411).json({ message: "Incorrect inputs" });

  const existingUser = await User.findOne({
    username: body.username,
  });

  if (existingUser) {
    return res.status(411).json({
      message: "Email already taken / Incorrect inputs",
    });
  }

  const user = await User.create(body);
  const userId = user._id;
  /// ------ Create new account -------

  await Account.create({
    userId,
    balance: 1 + Math.random() * 10000,
  });

  // -----------------------------------
  const token = jwt.sign(
    {
      userId: user._id,
    },
    JWT_SECRET
  );

  res.json({
    message: "User created successfully",
    token: token,
  });
});

const signInSchema = zod.object({
  username: zod.string(),
  password: zod.string(),
});

router.post("/signin", async (req, res) => {
  const body = req.body;
  console.log(body);
  const { success } = signInSchema.safeParse(body);
  if (!success)
    return res.status(411).json({
      message: "Error while logging in",
    });

  const user = await User.findOne({
    username: body.username,
    password: body.password,
  });

  if (user) {
    const token = jwt.sign(
      {
        userId: user._id,
      },
      JWT_SECRET
    );

    res.json({
      token: token,
    });
    return;
  }
  return res.status(411).json({
    message: "Error while logging in",
  });
});

const updateSchema = zod.object({
  password: zod.string().optional(),
  firstname: zod.string().optional(),
  lastname: zod.string().optional(),
});

router.put("/", authMiddleware, async (req, res) => {
  const body = req.body;
  const { success } = updateSchema.parse(body);
  if (!success)
    return res.status(411).json({
      message: "Error while updating information",
    });

  await User.updateOne(
    {
      _id: req.userId,
    },
    req.body
  );
  res.json({
    message: "Updated successfully",
  });
});

router.get("/bulk", async (req, res) => {
  const filter = req.query.filter || "";
  const users = await User.find({
    $or: [
      {
        firstname: {
          $regex: filter,
        },
      },
      {
        lastname: {
          $regex: filter,
        },
      },
    ],
  });
  res.json({
    user: users.map((user) => ({
      username: user.username,
      firstname: user.firstname,
      lastname: user.lastname,
    })),
  });
});

module.exports = router;
