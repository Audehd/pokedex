import { combineReducers } from "redux";

import userReducer from "./UserReducer";
import teamsReducer from "./teamsReducer";

export default combineReducers({ user: userReducer, teams: teamsReducer });
