import { createSlice } from "@reduxjs/toolkit";

const initialState = [
  { id: "1", name: "Ebuka Chuqz" },
  { id: "2", name: "Robert Greene" },
  { id: "3", name: "Jordan Peterson" },
];

const usersSlice = createSlice({
  name: "users",
  initialState,
  reducers: {},
});

export const selectAllUsers = (state) => state.users;

export default usersSlice.reducer;
