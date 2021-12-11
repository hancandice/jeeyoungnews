import { delay, put, select, takeLatest } from "@redux-saga/core/effects";
import { call } from "redux-saga/effects";
import searchService from "../../service/searchService";
import { clippedActions } from "../clipped/reducer";
import { ClippedState } from "../clipped/types";
import getState from "../getState";
import { searchActions } from "./reducer";
import { NewsItem, SearchState } from "./types";

const { getSearch, getClipped } = getState;

export function* getSearchHistorySaga() {
  while (true) {
    console.log("fetching search history from local database...");
    const searchHistory: string[] | null = yield call(
      searchService.getSearchHistory
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
  const { data }: SearchState = yield select(getSearch);
  const { data: clippedData }: ClippedState = yield select(getClipped);
  while (true) {
    try {
      const newsItemList: NewsItem[] = yield call(
        searchService.fetchNewsWithKeyword,
        action.payload.keyword,
        action.payload.first ? 0 : Math.ceil(data.length / 10)
      );

      const clippedNewsIds: string[] = clippedData.map((clipped) => clipped.id);
      const checkedItemList: NewsItem[] = newsItemList.map((news) =>
        clippedNewsIds.includes(news.id)
          ? { ...news, clipped: !news.clipped }
          : news
      );

      if (action.payload.first) {
        yield put(searchActions.fetchNewsWithKeywordSuccess(checkedItemList));
        yield put(searchActions.addSearchKeyword(action.payload.keyword));
      } else {
        yield put(
          searchActions.fetchNewsWithKeywordSuccess(
            data.concat(checkedItemList)
          )
        );
      }
      break;
    } catch (e: any) {
      yield put(searchActions.fetchNewsWithKeywordError(e));
      yield delay(1000 * 5);
    }
  }
}

export function* addSearchKeywordSaga(
  action: ReturnType<typeof searchActions.addSearchKeyword>
) {
  const { searchHistory }: SearchState = yield select(getSearch);
  try {
    const newItemList: string[] = yield call(
      searchService.addSearchKeyword,
      searchHistory,
      action.payload
    );
    yield put(searchActions.addSearchKeywordSuccess(newItemList));
  } catch (e: any) {
    yield put(searchActions.addSearchKeywordError(e));
  }
}

export function* clipSaga(action: ReturnType<typeof searchActions.clip>) {
  const { data: clippedNews }: ClippedState = yield select(getClipped);
  const { data }: SearchState = yield select(getSearch);
  try {
    const newItemList: NewsItem[] = yield call(
      searchService.clip,
      clippedNews,
      action.payload
    );

    const newData = data.map((news) =>
      news.id === action.payload.id ? { ...news, clipped: !news.clipped } : news
    );

    yield put(clippedActions.receiveClippedNews(newItemList));
    yield put(searchActions.updateData(newData));
  } catch (e: any) {
    yield put(searchActions.clipError(e));
  }
}

export default function* searchSaga() {
  yield call(getSearchHistorySaga);
  yield takeLatest(
    searchActions.fetchNewsWithKeyword.type,
    fetchNewsWithKeywordSaga
  );
  yield takeLatest(searchActions.addSearchKeyword.type, addSearchKeywordSaga);
  yield takeLatest(searchActions.clip.type, clipSaga);
}
