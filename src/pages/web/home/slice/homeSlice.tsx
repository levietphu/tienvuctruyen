import { createSlice, PayloadAction, createAsyncThunk } from "@reduxjs/toolkit";
import type { RootState } from "../../../../store/";
import axios from "axios";

export const getApiHome = createAsyncThunk("home/getApiHome", async () => {
  const response = await axios.get(`${process.env.REACT_APP_API}home`);
  return response.data;
});

// Define a type for the slice state
interface HomeState {
  data: any[];
  checkPopupHome: boolean;
  loading: boolean;
}

// Define the initial state using that type
const initialState: HomeState = {
  data: [],
  checkPopupHome: false,
  loading: true,
};

export const homeSlice = createSlice({
  name: "home",
  // `createSlice` will infer the state type from the `initialState` argument
  initialState,
  reducers: {
    // Use the PayloadAction type to declare the contents of `action.payload`
    showPopupHome: (state, action: PayloadAction<boolean>) => {
      state.checkPopupHome = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(getApiHome.pending, (state, action) => {
      state.loading = true;
    });
    builder.addCase(getApiHome.fulfilled, (state, action) => {
      state.loading = false;
      state.data = action.payload;
    });
    builder.addCase(getApiHome.rejected, (state, action) => {
      state.loading = false;
    });
  },
});

// export const { getHomePage } = homeSlice.actions;

// Other code such as selectors can use the imported `RootState` type
export const homeLoading = (state: RootState) => state.home.loading;
export const homeData = (state: RootState) => state.home.data;

export default homeSlice.reducer;
