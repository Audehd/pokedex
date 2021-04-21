import { TeamTypes } from "./actionTypes";

export const addTeam = (team) => ({
  type: TeamTypes.ADD_TEAM,
  team,
});

export const editTeamName = (name) => ({
  type: TeamTypes.EDIT_TEAM_NAME,
  name,
});

export const addPokemonToTeam = (pokemon, nature, pokedexNumber) => ({
  type: TeamTypes.ADD_POKEMON_TO_TEAM,
  pokemon,
  nature,
  pokedexNumber,
});

export const stopTeam = () => ({
  type: TeamTypes.STOP_TEAM,
});

export const updateTeam = (team) => ({
  type: TeamTypes.UPDATE_TEAM,
  team,
});

export const deleteTeam = (team) => ({
  type: TeamTypes.DELETE_TEAM,
  team,
});
