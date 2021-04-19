import { TeamTypes } from "./actionTypes";

export const addTeam = (team) => ({
  type: TeamTypes.ADD_TEAM,
  team,
});

export const updateTeam = (team) => ({
  type: TeamTypes.UPDATE_TEAM,
  team,
});

export const deleteTeam = (team) => ({
  type: TeamTypes.DELETE_TEAM,
  team,
});
