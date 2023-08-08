import { useContext } from "react";
import { UserContext } from "../UserProvider";
import { loginUser, registerUser } from "@/pages/api/auth";

export function useAuth() {
  const {
    userState,
    isAuthenticated,
    dispatch,
    deletUserDataLocalStorage,
    setUserDataLocalStorage
  } = useContext(UserContext);


  async function OnLogin({ email, password }) {
    dispatch({ type: 'checking' });
    try {
      const res = await loginUser({ email, password });
      if (!res.data) dispatch({ type: 'not-authenticated' })
      if (res.data) {
        const { data } = res
        dispatch({ type: 'authenticated', payload: data })
        setUserDataLocalStorage(data)
      }
    } catch (error) {
      throw new Error("Error while login user status(500) contact with Service!")
    }
  }

  function OnLogout() {
    dispatch({ type: 'checking' });
    const deleted = deletUserDataLocalStorage();
    if (deleted) {
      dispatch({ type: 'not-authenticated' });
    }
    console.log(isAuthenticated);
  }

  async function OnRegister({ name, username, email, password }) {
    const data = await registerUser({ name, username, email, password })
    return data;
  }

  return {
    OnLogin,
    OnLogout,
    OnRegister,
    isAuthenticated,
    userState
  };
}
