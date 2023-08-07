const { configureStore } = require("@reduxjs/toolkit");
const { authSlice } = require("./features/AuthSlice");

export const store = configureStore({
  reducer: {
    auth: authSlice.reducer
  }
});

