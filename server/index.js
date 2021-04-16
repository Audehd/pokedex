const express = require("express");
const morgan = require("morgan");

const app = express();

const {
  getUserByEmail,
  addUser,
  loginUser,
} = require("./handlers/Userhandlers");

const {
  getPokemonByName,
  getPokemonByPokedexNumber,
  getPokemonsByType,
  getPokemonSpeciesByName,
  getPokemonList,
  getColorsList,
  getTypesList,
  getTypeByName,
  getEvolutionChainById,
} = require("./handlers/Pokemonhandlers");

const PORT = process.env.PORT || 8000;

app.use(express.json());

app.use(morgan("tiny"));
app.use(express.static("public"));
app.use(express.urlencoded({ extended: false }));
app.use("/", express.static(__dirname + "/"));

// User Endpoints ___________________________

app.get("/users/user/:id", getUserByEmail);

app.post("/users", addUser);

app.post("/users/login", loginUser);

// Pokemon Endpoints ________________________

//get one Pokemon by name
app.get("/pokemons/pokemon/:name", getPokemonByName);

//get one Pokemon by pokedex number
app.get("/pokemon/pokedexnumber/:pokedexNumber", getPokemonByPokedexNumber);

//get several Pokemons by name, the endpoint accepts an array of pokemon names or Ids
app.post("/pokemons/pokemon/name", getPokemonByName);

//get a Pokemon list, this returns an array of pokemon names
app.get("/pokemons/list", getPokemonList);

//get Pokemon by species, to get aditional information about a specific pokemon
app.get("/pokemons/species/:name", getPokemonSpeciesByName);

//get a list of all pokemon colors
app.get("/colors", getColorsList);

//get a list of a pokemon types
app.get("/types", getTypesList);

//get a specific type by name
app.post("/types/name", getTypeByName);

app.get("/types/:type", getPokemonsByType);

//get info about the evolution chain of a pokemon by pokemon id
app.get("/evolutionchain/:id", getEvolutionChainById);

app.get("");

// handle 404s
app.use((req, res) => res.status(404).type("txt").send("🤷‍♂️"));

app.listen(PORT, () => console.log(`Listening on port ${PORT}`));
