import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { NewsItem, NewsState, SearchNewsPayloads } from "./types";

export const initialState: NewsState = {
  loading: true,
  error: null,
  data: [],
  searchHistory: [],
  clippedNews: [],
};

const newsSlice = createSlice({
  name: "news",
  initialState,
  reducers: {
    receiveSearchHistory(state, action: PayloadAction<string[]>) {
      state.loading = false;
      state.searchHistory = action.payload;
    },
    receiveClippedNews(state, action: PayloadAction<NewsItem[]>) {
      state.loading = false;
      state.clippedNews = action.payload;
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
  },
});

export const newsActions = newsSlice.actions;
export default newsSlice.reducer;
