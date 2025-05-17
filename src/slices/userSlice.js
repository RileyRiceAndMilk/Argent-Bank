
import { createSlice } from '@reduxjs/toolkit';

const loadUserFromLocalStorage = () => {
  const id = localStorage.getItem("userId");
  const firstName = localStorage.getItem("userFirstName");
  const lastName = localStorage.getItem("userLastName");
  return id && firstName && lastName ? { id, firstName, lastName } : null;
};

const initialState = {
  user: loadUserFromLocalStorage(),
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUserData: (state, action) => {
      state.user = action.payload;
      localStorage.setItem("userId", action.payload.id);
      localStorage.setItem("userFirstName", action.payload.firstName);
      localStorage.setItem("userLastName", action.payload.lastName);
    },
    logoutUser: (state) => {
      state.user = null;
      localStorage.removeItem("userId");
      localStorage.removeItem("userFirstName");
      localStorage.removeItem("userLastName");
    },
  },
});

export const { setUserData, logoutUser } = userSlice.actions;
export default userSlice.reducer;
