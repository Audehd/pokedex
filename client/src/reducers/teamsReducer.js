import { TeamTypes } from "./actionTypes";
const initialState = {
  // user: "",
  teamName: "",
  team: [
    // {
    //   pokemonName: "",
    //   pokedexNumber: "",
    //   nickname: "",
    //   nature: "",
    //   helditem: "",
    // },
  ],
};

//
const teamsReducer = (state = initialState, action) => {
  console.log("ACTION", action);
  switch (action.type) {
    case TeamTypes.EDIT_TEAM_NAME: {
      return {
        ...state,
        teamName: action.name,
      };
    }
    case TeamTypes.ADD_POKEMON_TO_TEAM: {
      // We need to return a new state object
      return {
        // that has all the existing state data
        ...state,
        // but has a new array for the `team` field
        team: [
          // with all of the old pokemon
          ...state.team,
          // and the new pokemon object
          {
            pokemonName: action.pokemon.pokemonName,
            pokedexNumber: action.pokemon.pokedexNumber,
            nickname: action.pokemon.nickname,
            nature: action.pokemon.nature,
            helditem: action.pokemon.helditem,
          },
        ],
      };
    }
    default:
      return state;
  }
};

export default teamsReducer;
