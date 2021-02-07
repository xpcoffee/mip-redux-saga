import {createSlice} from "@reduxjs/toolkit";

const counterSlice = createSlice({
  name: "counter",
  initialState: 0,
  reducers: {
    increment: state => state + 1,
    decrement: state => state - 1,
  }
})
const { reducer, actions } = counterSlice;

export const { increment, decrement } = actions;
export default reducer;