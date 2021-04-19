const { MongoClient } = require("mongodb");
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
    //Declare client, connect to Mongodb and find teams
    const client = await MongoClient(MONGO_URI, options);

    await client.connect();

    const db = client.db("teams");

    const result = await db.collection(username).find().toArray();

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
  client.close();
};

const addTeam = async (req, res) => {
  //console.log("ADD TEAM", req.body);
  try {
    const teamOwner = req.body.username.toLowerCase();

    const teamName = req.body.teamName;

    const teamInfo = req.body.team.map((pokemon) => {
      return {
        pokemonName: pokemon.pokemonName,
        pokedexNumber: pokemon.pokedexNumber,
        nickname: pokemon.nickname,
        nature: pokemon.nature,
        helditem: pokemon.helditem,
      };
    });

    team = { user: teamOwner, teamName, team: teamInfo };

    console.log("object to send", team);

    //Declare client, connect to Mongodb and add team
    const client = await MongoClient(MONGO_URI, options);

    await client.connect();

    const db = client.db("teams");

    const result = await db.collection(teamOwner).insertOne(team);
    assert.strictEqual(1, result.insertedCount);

    res.status(201).json({ status: 201, message: "succesfully added team" });
  } catch (err) {
    res.status(500).send({ status: 500, message: err.message });
  }
  client.close();
};

module.exports = {
  getTeamsByUsername,
  addTeam,
};
