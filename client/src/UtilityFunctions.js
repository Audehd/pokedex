//This functions takes the pokemon main color as parameter and determines the background color
//and secondary color for the pokemon card and pokemon details page
export const setBackgroundColor = (color) => {
  if (color) {
    switch (color) {
      case "black": {
        let backgroundColor = "#666666";
        let secondaryColor = "#808080";
        return { backgroundColor, secondaryColor };
      }
      case "blue": {
        let backgroundColor = "#B3E0FF";
        let secondaryColor = "#C8E8FF";
        return { backgroundColor, secondaryColor };
      }
      case "brown": {
        let backgroundColor = "#F0C3A3";
        let secondaryColor = "#F6D3AF";
        return { backgroundColor, secondaryColor };
      }
      case "gray": {
        let backgroundColor = "#9ba2a8";
        let secondaryColor = "#B5BDC4";
        return { backgroundColor, secondaryColor };
      }
      case "green": {
        let backgroundColor = "#B4E4C9";
        let secondaryColor = "#B5EFCE";
        return { backgroundColor, secondaryColor };
      }
      case "pink": {
        let backgroundColor = "#F8B2BC";
        let secondaryColor = "#FBDEDE";
        return { backgroundColor, secondaryColor };
      }
      case "purple": {
        let backgroundColor = "#DBBDE5";
        let secondaryColor = "#DDC6E7";
        return { backgroundColor, secondaryColor };
      }
      case "red": {
        let backgroundColor = "#FFABAB";
        let secondaryColor = "#FFBEBC";
        return { backgroundColor, secondaryColor };
      }
      case "white": {
        let backgroundColor = "#E8EAEC";
        let secondaryColor = "#F7F7F7";
        return { backgroundColor, secondaryColor };
      }
      case "yellow": {
        let backgroundColor = "#FBEBA5";
        let secondaryColor = "#FEF3D5";
        return { backgroundColor, secondaryColor };
      }
      default:
        let backgroundColor = "white";
        let secondaryColor = "white";
        return { backgroundColor, secondaryColor };
    }
  }
};

export const getRandomPokemons = (callback, nextcallback) => {
  const randomPokemonIds = Array.from({ length: 40 }, () =>
    Math.ceil(Math.random() * 893)
  );
  callback(randomPokemonIds, nextcallback);
};

//Fetch several Pokemons by name or pokedex number
//the endpoint accepts an array of pokemon names or Ids (pokedex number)
export const getPokemonsByName = (pokemonList, callback) => {
  fetch("/pokemons/pokemon/name", {
    method: "POST",
    body: JSON.stringify(pokemonList),
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
  })
    .then((res) => res.json())
    .then((res) => {
      callback(res.data);
    })
    .catch((error) => {
      console.log("Error", error);
    });
};
