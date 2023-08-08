import { createContext, useState } from "react";
import { useReducer } from "react"
import { reducers } from "./userReducers";


export const UserContext = createContext();



export const UserProvider = ({ children }) => {

  const INITIAL_STATE = typeof window !== 'undefined' && localStorage.getItem('user_data')
  ? JSON.parse(localStorage.getItem('user_data'))
  : {
      status: 'not-authenticate',
      user: {
        username: null,
        name: null,
        id: null,
        email: null,
        avatar: null,
        token: null,
        isAuthenticated: false
      }
    };

  const [userState, dispatch] = useReducer(reducers, INITIAL_STATE);

  const isAuthenticated = userState.user.token ? true : false;

  const setUserDataLocalStorage = (data) => {
    console.log(data);
    const userAuthenticated = {
      status: 'authenticate',
      user: {
        username: data.username,
        name: data.name,
        id: null,
        email: data.email,
        avatar: null,
        token: data.token,
        isAuthenticated: true
      }
    }
    localStorage.setItem('user_data', JSON.stringify(userAuthenticated))
  }
  const deletUserDataLocalStorage = () => {
    localStorage.removeItem('user_data')
    return true
  }


  return (
    <UserContext.Provider value={
      {
        userState,
        isAuthenticated,
        dispatch,
        setUserDataLocalStorage,
        deletUserDataLocalStorage,
      }
    }>
      {children}
    </UserContext.Provider>
  )
}
