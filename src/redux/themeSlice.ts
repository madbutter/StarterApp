import { createSlice } from "@reduxjs/toolkit";
import { Themes } from "@/interfaces/theme";

const storeSelectedTheme = (theme: Themes) => {
  if (typeof window !== "undefined") {
    localStorage.setItem("selectedTheme", theme);
  }
};

export const getSelectedTheme = () => {
  if (typeof window !== "undefined") {
    const theme_ = localStorage.getItem("selectedTheme");
    return theme_;
  }
};

const initialState = {
  selectedTheme: getSelectedTheme() || Themes.dark,
} as any;

const themeSlice = createSlice({
  name: "theme",
  initialState,
  reducers: {
    changeTheme(state, action) {
      const newTheme = action.payload.selectedTheme;
      storeSelectedTheme(newTheme);
      return { ...state, selectedTheme: newTheme };
    },
  },
});

export const { changeTheme } = themeSlice.actions;
export default themeSlice.reducer;
