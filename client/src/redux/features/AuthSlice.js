const { createSlice } = require("@reduxjs/toolkit");

export const authSlice = createSlice({
  name: "auth",
  initialState: {
    status: 'not-authenticated',//'checking','not-authenticated','authenticated'
    name: null,
    lastname: null,
    email: null,
    avatar: null,
    id: null,
    errorMessage: null
  },
  reducers: {
    login: (state, action) => {
    },
    login: (state) => {
    },
    checkingCredentials: (state) => {
      state.status = 'checking'
    }
  }
})

export const { login, logout, checkingCredentials } = authSlice.reducer

