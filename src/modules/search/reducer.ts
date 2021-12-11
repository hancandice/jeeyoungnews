import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { NewsItem, SearchState, SearchNewsPayloads } from "./types";

export const initialState: SearchState = {
  loading: true,
  error: null,
  data: [],
  searchHistory: [],
};

const searchSlice = createSlice({
  name: "search",
  initialState,
  reducers: {
    receiveSearchHistory(state, action: PayloadAction<string[]>) {
      state.loading = false;
      state.searchHistory = action.payload;
    },
    fetchNewsWithKeyword(state, action: PayloadAction<SearchNewsPayloads>) {
      state.loading = true;
    },
    fetchNewsWithKeywordSuccess(state, action: PayloadAction<NewsItem[]>) {
      state.data = action.payload;
      state.error = null;
      state.loading = false;
    },
    fetchNewsWithKeywordError(state, action: PayloadAction<any>) {
      state.error = action.payload;
      state.loading = false;
    },
    addSearchKeyword(state, action: PayloadAction<string>) {
      state.loading = true;
    },
    addSearchKeywordSuccess(state, action: PayloadAction<string[]>) {
      state.loading = false;
      state.searchHistory = action.payload;
    },
    addSearchKeywordError(state, action: PayloadAction<any>) {
      state.loading = false;
      state.error = action.payload;
    },
    clip(state, action: PayloadAction<NewsItem>) {
      state.loading = true;
    },
    updateData(state, action: PayloadAction<NewsItem[]>) {
      state.loading = false;
      state.data = action.payload;
    },
    clipError(state, action: PayloadAction<any>) {
      state.loading = false;
      state.error = action.payload;
    },
  },
});

export const searchActions = searchSlice.actions;
export default searchSlice.reducer;
