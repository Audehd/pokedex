var Pokedex = require("pokedex-promise-v2");

var P = new Pokedex();

const getPokemonByName = (req, res) => {
  P.getPokemonByName(req.body)
    .then((response) => {
      res
        .status(201)
        .json({ status: 201, data: response, message: "Pokemon data" });
    })
    .catch((error) => {
      res.status(500).send({ status: 500, message: error.message });
    });
};

const getPokemonByPokedexNumber = (req, res) => {
  console.log("POKEMON BY NUMBER", req.params);
  P.getPokemonByName(req.params.pokedexNumber)
    .then((response) => {
      res
        .status(201)
        .json({ status: 201, data: response, message: "Pokemon data" });
    })
    .catch((error) => {
      res.status(500).send({ status: 500, message: error.message });
    });
};

const getPokemonColorByName = (req, res) => {
  //Use getPokemonColorByName to return data about specific pokemon color.
  P.getPokemonColorByName("black")
    .then(function (response) {
      console.log(response);
    })
    .catch(function (error) {
      console.log("There was an ERROR: ", error);
    });
};

const getColorsList = (req, res) => {
  P.getPokemonColorsList().then((response) => {
    res
      .status(201)
      .json({ status: 201, data: response, message: "Pokemon colors list" });
  });
};

const getTypesList = (req, res) => {
  P.getTypesList().then((response) => {
    res
      .status(201)
      .json({ status: 201, data: response, message: "Pokemon types list" });
  });
};

const getTypeByName = (req, res) => {
  P.getTypeByName(req.body)
    .then((response) => {
      res
        .status(201)
        .json({ status: 201, data: response, message: "Pokemon type data" });
    })
    .catch((error) => {
      res.status(500).send({ status: 500, message: error.message });
    });
};

const getPokemonsByType = (req, res) => {};

const getPokemonSpeciesByName = (req, res) => {
  P.getPokemonSpeciesByName(req.params.name)
    .then((response) => {
      res
        .status(201)
        .json({ status: 201, data: response, message: "Pokemon species data" });
    })
    .catch((error) => {
      res.status(500).send({ status: 500, message: error.message });
    });
};

const getPokemonList = (req, res) => {
  var interval = {
    limit: 100,
    offset: 100,
  };
  P.getPokemonsList(interval).then((response) => {
    res
      .status(201)
      .json({ status: 201, data: response, message: "Pokemon list data" });
  });
};

const getEvolutionChainById = (req, res) => {
  P.getEvolutionChainById(req.params.id)
    .then((response) => {
      res
        .status(201)
        .json({
          status: 201,
          data: response,
          message: "Pokemon evolution chain data",
        });
    })
    .catch((error) => {
      res.status(500).send({ status: 500, message: error.message });
    });
};

module.exports = {
  getPokemonByName,
  getPokemonByPokedexNumber,
  getPokemonsByType,
  getPokemonSpeciesByName,
  getPokemonList,
  getColorsList,
  getTypesList,
  getTypeByName,
  getEvolutionChainById,
};
