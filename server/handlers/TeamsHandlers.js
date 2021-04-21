const { MongoClient, ObjectId } = require("mongodb");
const assert = require("assert");

require("dotenv").config();
const { MONGO_URI } = process.env;

const options = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
};

const getTeamsByUsername = async (req, res) => {
  const username = req.params.username;

  console.log(username);
  try {
    const client = await MongoClient(MONGO_URI, options);

    await client.connect();

    const db = client.db("teams");

    const query = { "user.username": username };

    //const result = await db.collection(username).find().toArray();
    const result = await db.collection("teamsInfo").find(query).toArray();

    if (result) {
      res.status(201).json({
        status: 201,
        data: result,
        message: "all teams for user",
      });
    } else {
      res.status(401).json({
        status: 401,
        message: "user does not exist, or does not have any teams",
      });
    }
  } catch (err) {
    res.status(500).send({ status: 500, message: err.message });
  }
};

const addTeam = async (req, res) => {
  console.log("ADD TEAM", req.body);
  try {
    const team = req.body;

    const client = await MongoClient(MONGO_URI, options);

    await client.connect();

    const db = client.db("teams");

    const result = await db.collection("teamsInfo").insertOne(team);
    assert.strictEqual(1, result.insertedCount);

    res.status(201).json({ status: 201, message: "succesfully added team" });
  } catch (err) {
    res.status(500).send({ status: 500, message: err.message });
  }
};

module.exports = {
  getTeamsByUsername,
  addTeam,
};
