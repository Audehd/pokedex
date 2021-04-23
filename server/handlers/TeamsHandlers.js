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

const editTeam = async (req, res) => {
  const teamId = req.body.teamId;

  const query = { _id: ObjectId(teamId) };

  const newValues = { $set: { team: req.body.team } };

  console.log(123, teamId);
  try {
    const client = await MongoClient(MONGO_URI, options);

    await client.connect();

    const db = client.db("teams");

    //const query = { "user.username": teamId };

    //If there is a "team" key then update the pokemon team
    if (newValues) {
      const result = await db
        .collection("teamsInfo")
        .updateOne(query, newValues);
      assert.strictEqual(1, result.matchedCount);

      if (result) {
        res.status(201).json({
          status: 201,
          message: "successfully updated",
        });
      } else {
        res.status(401).json({
          status: 401,
          message: "team id does not exist",
        });
      }
      //if there is no team key then return error
    } else {
      res.status(400).json({
        status: 400,
        message: "Cannot update team, please enter valid format",
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

const removePokemonFromTeam = async (req, res) => {
  const teamId = req.params.teamid;
  const pokemon = req.body.pokemonNumber;
  console.log(pokemon);

  const query = { _id: ObjectId(teamId) };

  const removeValue = { $pull: { "team.team": { pokedexNumber: pokemon } } };

  console.log(123, teamId);
  try {
    const client = await MongoClient(MONGO_URI, options);

    await client.connect();

    const db = client.db("teams");

    const result = await db
      .collection("teamsInfo")
      .updateOne(query, removeValue);
    assert.strictEqual(1, result.matchedCount);

    if (result) {
      res.status(201).json({
        status: 201,
        //data: result,
        message: "successfully removed pokemon from team",
      });
    } else {
      res.status(401).json({
        status: 401,
        message: "team id does not exist",
      });
    }
  } catch (err) {
    res.status(500).send({ status: 500, message: err.message });
  }
};

const deleteTeam = async (req, res) => {
  const teamId = req.params.teamid;
  const client = await MongoClient(MONGO_URI, options);

  await client.connect();

  const db = client.db("teams");

  const result = await db
    .collection("teamsInfo")
    .deleteOne({ _id: ObjectId(teamId) });
  assert.strictEqual(1, result.deletedCount);
  if (result) {
    res.status(201).json({ status: 200, message: "successfully deleted team" });
  } else {
    res.status(500).json({ status: 500, message: err.message });
  }

  client.close();
};

module.exports = {
  getTeamsByUsername,
  addTeam,
  editTeam,
  removePokemonFromTeam,
  deleteTeam,
};
