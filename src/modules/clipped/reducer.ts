import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { NewsItem } from "../search/types";
import { ClippedState } from "./types";

export const initialState: ClippedState = {
  loading: true,
  error: null,
  data: [],
};

const clippedSlice = createSlice({
  name: "clipped",
  initialState,
  reducers: {
    receiveClippedNews(state, action: PayloadAction<NewsItem[]>) {
      state.loading = false;
      state.data = action.payload;
    },
    unclip(state, action: PayloadAction<string>) {
      state.loading = true;
    },
    unclipSuccess(state, action: PayloadAction<NewsItem[]>) {
      state.data = action.payload;
      state.error = null;
      state.loading = false;
    },
    unclipError(state, action: PayloadAction<any>) {
      state.error = action.payload;
      state.loading = false;
    },
  },
});

export const clippedActions = clippedSlice.actions;
export default clippedSlice.reducer;
