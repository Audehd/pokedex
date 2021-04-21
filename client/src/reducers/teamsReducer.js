import { TeamTypes } from "./actionTypes";
const initialState = {
  teamName: "",
  team: [],
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
            pokemonName: "pokemon",
            pokedexNumber: action.pokedexNumber,
            nickname: action.pokemon.nickname,
            nature: action.nature,
            helditem: action.pokemon.helditem,
          },
        ],
      };
    }
    case TeamTypes.STOP_TEAM: {
      return {
        ...initialState,
      };
    }
    default:
      return state;
  }
};

export default teamsReducer;
