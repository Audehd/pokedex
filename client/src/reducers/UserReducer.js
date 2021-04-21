import { Types } from "./actionTypes";
const initialState = {
  user: {
    id: "",
    username: "",
    email: "",
  },
};

const userReducer = (state = initialState, action) => {
  //console.log(action);
  //console.log(action.type, Types.LOGIN);
  switch (action.type) {
    case Types.LOGIN: {
      return {
        ...state,
        user: action.user,
      };
    }
    case Types.LOG_OUT: {
      return {
        ...initialState,
      };
    }
    default:
      return state;
  }
};

export default userReducer;
