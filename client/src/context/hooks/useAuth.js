import { useContext } from "react";
import { UserContext } from "../UserProvider";
import { loginUser } from "@/pages/api/auth";

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
      dispatch({ type:'not-authenticated' });
    }
    console.log(isAuthenticated);
  }

  return {
    OnLogin,
    OnLogout,
    isAuthenticated,
    userState
  };
}
