import { checkingCredentials } from "../features/AuthSlice"

export const checkingAuthentications = (email, password) => {
  return async (dispatch) => {
    dispatch(checkingCredentials())
  }
}