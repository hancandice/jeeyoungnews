import { delay, put, select, takeLatest } from "@redux-saga/core/effects";
import { useRef } from "react";
import { call } from "redux-saga/effects";
import { RootState } from "../../redux";
import newsService from "../../service/newsService";
import { newsActions } from "./reducer";
import { NewsItem, NewsState } from "./types";

export const getNews = (state: RootState) => state.news;

export function* getInitialStateSaga() {
  while (true) {
    console.log(
      "fetching clipped news && search history from local database..."
    );
    const clippedNews: NewsItem[] | null = yield call(
      newsService.getClippedNews
    );
    const searchHistory: string[] | null = yield call(
      newsService.getSearchHistory
    );
    if (clippedNews && searchHistory) {
      yield put(newsActions.receiveClippedNews(clippedNews));
      yield put(newsActions.receiveSearchHistory(searchHistory));
      break;
    } else {
      yield delay(1000 * 5);
    }
  }
}

export function* fetchNewsWithKeywordSaga(
  action: ReturnType<typeof newsActions.fetchNewsWithKeyword>
) {
  const { data }: NewsState = yield select(getNews);
  while (true) {
    try {
      const newsItemList: NewsItem[] = yield call(
        newsService.fetchNewsWithKeyword,
        action.payload.keyword,
        action.payload.first ? 0 : Math.ceil(data.length / 10)
      );
      if (action.payload.first) {
        yield put(newsActions.fetchNewsWithKeywordSuccess(newsItemList));
      } else {
        yield put(
          newsActions.fetchNewsWithKeywordSuccess(data.concat(newsItemList))
        );
      }
      break;
    } catch (e: any) {
      yield put(newsActions.fetchNewsWithKeywordError(e));
      yield delay(1000 * 5);
    }
  }
}

export default function* newsSaga() {
  yield call(getInitialStateSaga);
  yield takeLatest(
    newsActions.fetchNewsWithKeyword.type,
    fetchNewsWithKeywordSaga
  );
}
