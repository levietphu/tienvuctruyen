import { createSlice, PayloadAction, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const getApiLayout = createAsyncThunk("layout", async () => {
  const res = await axios.get(`${process.env.REACT_APP_API}layout`);

  return res.data.data;
});

const value = localStorage.getItem("theme");
const value2 = localStorage.getItem("size");

let saveTheme: any;
let saveSize: any;
if (typeof value === "string") {
  saveTheme = JSON.parse(value);
}
if (typeof value2 === "string") {
  saveSize = JSON.parse(value2);
}

export const commonSlice = createSlice({
  name: "common",
  // `createSlice` will infer the state type from the `initialState` argument
  initialState: {
    setting: {
      theme: saveTheme || "light",
      size: Number(saveSize) || 1.2,
      togglePopup: false,
    },
    layout: {
      dataLayout: {
        cates: [],
        khau_hieu: {},
        link_androi: {},
        link_apple: {},
        logo_footer: {},
        logo_header: {},
      },
      loading: true,
    },
  },
  reducers: {
    // Use the PayloadAction type to declare the contents of `action.payload`
    changeTheme: (state, action: PayloadAction<string>) => {
      state.setting.theme = action.payload;
      localStorage.setItem("theme", JSON.stringify(state.setting.theme));
    },
    changeSize: (state, action: PayloadAction<boolean>) => {
      if (action.payload) {
        state.setting.size += 0.1;
      } else {
        state.setting.size -= 0.1;
      }
      localStorage.setItem("size", JSON.stringify(state.setting.size));
    },
    isTogglePopup: (state, action: PayloadAction<boolean>) => {
      state.setting.togglePopup = action.payload;
      if (action.payload) {
        document.body.classList.add("hidden__scroll");
      } else {
        document.body.classList.remove("hidden__scroll");
      }
    },
  },
  extraReducers: (builder) => {
    builder.addCase(getApiLayout.fulfilled, (state, action) => {
      state.layout.dataLayout = action.payload;
      state.layout.loading = false;
    });
  },
});

export const { changeTheme, changeSize, isTogglePopup } = commonSlice.actions;

// Other code such as selectors can use the imported `RootState` type

export default commonSlice.reducer;
