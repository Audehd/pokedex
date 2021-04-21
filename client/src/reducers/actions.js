import { Types } from "./actionTypes";

export const addProfile = (user) => ({
  type: Types.ADD_USER,
  user,
});

export const updateProfile = (user) => ({
  type: Types.UPDATE_USER,
  user,
});

export const login = (user) => ({
  type: Types.LOGIN,
  user,
});

export const logout = (user) => ({
  type: Types.LOG_OUT,
  user,
});
