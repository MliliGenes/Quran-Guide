import { configureStore } from "@reduxjs/toolkit";
import QuranReducer from "./quranSlice.js";

const store = configureStore({
  reducer: {
    quran: QuranReducer,
  },
});

export default store;
