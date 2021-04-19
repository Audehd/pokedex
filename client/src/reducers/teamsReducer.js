import { Types } from "./actionTypes";
const initialState = {};

//
const teamsReducer = (state = initialState, action) => {
  console.log(action);
  console.log(action.type, Types.ADD_TEAM);
  switch (action.type) {
    case Types.EDIT_TEAM: {
      return {
        ...state,
        team: action.team,
      };
    }
    default:
      return state;
  }
};

export default teamsReducer;
