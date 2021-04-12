const { MongoClient } = require("mongodb");
const assert = require("assert");
const bcrypt = require("bcrypt");

require("dotenv").config();
const { MONGO_URI } = process.env;

const options = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
};

const getUser = async (req, res) => {};

const addUser = async (req, res) => {
  try {
    //generate salt to encrypt the password
    const salt = await bcrypt.genSalt(10);
    //encrypt the password
    const hashedPassword = await bcrypt.hash(req.body.password, salt);
    //declare the user, from req.body and the encrypted password
    const user = {
      username: req.body.username,
      email: req.body.email,
      password: hashedPassword,
    };
    //Declare client, connect to Mongodb and add user
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
  console.log("REQUEST", req.body);
  const username = req.body.username;
  const password = req.body.password;
  //const user = usersInfo.find(user => user.username = req.body.username)
  //await bcrypt.compare(req.body.password, user.password);

  try {
    //Declare client, connect to Mongodb and find user
    const client = await MongoClient(MONGO_URI, options);

    await client.connect();

    const db = client.db("users");

    const result = await db.collection("usersInfo").findOne({ username });
    console.log("result", result);
    const passwordCheck = await bcrypt.compare(password, result.password);

    if (passwordCheck) {
      const { _id, username, email } = result;
      res
        .status(201)
        .json({
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
};

module.exports = {
  getUser,
  addUser,
  loginUser,
};