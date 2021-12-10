import { delay, put, select, takeLatest } from "@redux-saga/core/effects";
import { call } from "redux-saga/effects";
import { RootState } from "../../redux";
import newsService from "../../service/newsService";
import { searchActions } from "./reducer";
import { NewsItem, SearchState } from "./types";

export const getNews = (state: RootState) => state.search;

export function* getSearchHistorySaga() {
  while (true) {
    console.log("fetching search history from local database...");
    const searchHistory: string[] | null = yield call(
      newsService.getSearchHistory
    );
    if (searchHistory) {
      yield put(searchActions.receiveSearchHistory(searchHistory));
      break;
    } else {
      yield delay(1000 * 5);
    }
  }
}

export function* fetchNewsWithKeywordSaga(
  action: ReturnType<typeof searchActions.fetchNewsWithKeyword>
) {
  const { data }: SearchState = yield select(getNews);
  while (true) {
    try {
      const newsItemList: NewsItem[] = yield call(
        newsService.fetchNewsWithKeyword,
        action.payload.keyword,
        action.payload.first ? 0 : Math.ceil(data.length / 10)
      );
      if (action.payload.first) {
        yield put(searchActions.fetchNewsWithKeywordSuccess(newsItemList));
      } else {
        yield put(
          searchActions.fetchNewsWithKeywordSuccess(data.concat(newsItemList))
        );
      }
      break;
    } catch (e: any) {
      yield put(searchActions.fetchNewsWithKeywordError(e));
      yield delay(1000 * 5);
    }
  }
}

export default function* searchSaga() {
  yield call(getSearchHistorySaga);
  yield takeLatest(
    searchActions.fetchNewsWithKeyword.type,
    fetchNewsWithKeywordSaga
  );
}
