var Pokedex = require("pokedex-promise-v2");

var P = new Pokedex();

const getPokemonByName = (req, res) => {
  console.log(req.body);
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
  const getRandomInt = (min, max) => {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min) + min);
  };

  var interval = {
    limit: 100,
    offset: getRandomInt(1, 893),
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
      res.status(201).json({
        status: 201,
        data: response,
        message: "Pokemon evolution chain data",
      });
    })
    .catch((error) => {
      res.status(500).send({ status: 500, message: error.message });
    });
};

const getRegionByName = (req, res) => {
  P.getRegionByName(req.params.name)
    .then((response) => {
      res.status(201).json({
        status: 201,
        data: response,
        message: "Pokemon location (region) data",
      });
    })
    .catch((error) => {
      res.status(500).send({ status: 500, message: error.message });
    });
};

const getPokedexByName = (req, res) => {
  console.log(123, req.params.name);
  P.getPokedexByName(req.params.name)
    .then((response) => {
      res.status(201).json({
        status: 201,
        data: response,
        message: "Pokedex data",
      });
    })
    .catch((error) => {
      res.status(500).send({ status: 500, message: error.message });
    });
};

const getPokedexList = (req, res) => {
  P.getPokedexsList().then((response) => {
    res
      .status(201)
      .json({ status: 201, data: response, message: "Pokedex list" });
  });
};

const getNaturesList = (req, res) => {
  P.getNaturesList().then((response) => {
    res
      .status(201)
      .json({ status: 201, data: response, message: "Natures list" });
  });
};

const getBerriesList = (req, res) => {
  P.getBerriesList().then((response) => {
    res
      .status(201)
      .json({ status: 201, data: response, message: "Berries list" });
  });
};

const getHeldItemList = (req, res) => {
  P.getItemCategoryByName("held-items")
    .then((response) => {
      res.status(201).json({
        status: 201,
        data: response,
        message: "Held items list",
      });
    })
    .catch((error) => {
      res.status(500).send({ status: 500, message: error.message });
    });
};

const getItemCategoriesList = (req, res) => {
  P.getItemCategoriesList().then((response) => {
    res
      .status(201)
      .json({ status: 201, data: response, message: "Natures list" });
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
  getRegionByName,
  getPokedexByName,
  getPokedexList,
  getNaturesList,
  getBerriesList,
  getItemCategoriesList,
  getHeldItemList,
};
