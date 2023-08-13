import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import type { RootState } from "../../../../store/index";

// Define the initial state using that type
const initialState = {
  alert: "",
  showMessageSuccess: false,
};

export const storyPageSlice = createSlice({
  name: "storyPage",
  // `createSlice` will infer the state type from the `initialState` argument
  initialState,
  reducers: {
    successBuyChapterMany(state, action) {
      return { ...action.payload };
    },
  },
});

export const { successBuyChapterMany } = storyPageSlice.actions;

// Other code such as selectors can use the imported `RootState` type
export const selectStory = (state: RootState) => state.storyPage.alert;

export default storyPageSlice.reducer;
