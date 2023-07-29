import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../index";

// Define the initial state using that type
const initialState = [
  {
    name: "",
    slug: "",
    status: 1,
  },
];

export const cateSlice = createSlice({
  name: "cate",
  // `createSlice` will infer the state type from the `initialState` argument
  initialState,
  reducers: {
    // Use the PayloadAction type to declare the contents of `action.payload`
    viewCate: (state, action: PayloadAction<any>) => {
      console.log(state, action.payload);
    },
  },
});

export const { viewCate } = cateSlice.actions;

export const dataCate = (state: RootState) => state.cate;

export default cateSlice.reducer;
