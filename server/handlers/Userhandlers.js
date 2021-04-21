const { MongoClient } = require("mongodb");
const assert = require("assert");
const bcrypt = require("bcrypt");

require("dotenv").config();
const { MONGO_URI } = process.env;

const options = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
};

const getUserByEmail = async (req, res) => {
  const email = req.params.id;

  console.log(email);
  try {
    const client = await MongoClient(MONGO_URI, options);

    await client.connect();

    const db = client.db("users");

    const result = await db.collection("usersInfo").findOne({ email });

    if (result) {
      const { _id, username, email } = result;
      res.status(201).json({
        status: 201,
        data: { id: _id, username, email },
        message: "user information",
      });
    } else {
      res.status(401).json({ status: 401, message: "user does not exist" });
    }
  } catch (err) {
    res.status(500).send({ status: 500, message: err.message });
  }
  client.close();
};

const addUser = async (req, res) => {
  try {
    //generate salt to encrypt the password
    const salt = await bcrypt.genSalt(10);
    //encrypt the password
    const hashedPassword = await bcrypt.hash(req.body.password, salt);
    //declare the user, from req.body and the encrypted password
    const user = {
      username: req.body.username.toLowerCase(),
      email: req.body.email,
      password: hashedPassword,
    };
    const client = await MongoClient(MONGO_URI, options);

    await client.connect();

    const db = client.db("users");

    const result = await db.collection("usersInfo").insertOne(user);
    assert.strictEqual(1, result.insertedCount);

    res.status(201).json({ status: 201, message: "succesfully added user" });
  } catch (err) {
    res.status(500).send({ status: 500, message: err.message });
  }
  client.close();
};

const loginUser = async (req, res) => {
  const username = req.body.username;
  const password = req.body.password;

  try {
    const client = await MongoClient(MONGO_URI, options);

    await client.connect();

    const db = client.db("users");

    const result = await db.collection("usersInfo").findOne({ username });
    console.log("result", result);
    const passwordCheck = await bcrypt.compare(password, result.password);

    if (passwordCheck) {
      const { _id, username, email } = result;
      res.status(201).json({
        status: 201,
        data: { id: _id, username, email },
        message: "user is now logged in",
      });
    } else {
      res.status(401).json({ status: 401, message: "user password is wrong" });
    }
  } catch (err) {
    res.status(500).send({ status: 500, message: err.message });
  }
  client.close();
};

module.exports = {
  getUserByEmail,
  addUser,
  loginUser,
};
