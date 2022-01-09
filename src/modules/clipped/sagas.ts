import { delay, put, select, takeLatest } from "@redux-saga/core/effects";
import { call } from "redux-saga/effects";
import { RootState } from "../../redux";
import clippedService from "../../service/clippedService";
import getState from "../getState";
import { searchActions } from "../search/reducer";
import { NewsItem } from "../search/types";
import { clippedActions } from "./reducer";

export function* getClippedNewsSaga() {
  while (true) {
    console.log("fetching clipped news from local database...");
    const clippedNews: NewsItem[] | null = yield call(
      clippedService.getClippedNews
    );
    if (clippedNews) {
      yield put(clippedActions.receiveClippedNews(clippedNews));
      break;
    } else {
      yield delay(1000 * 5);
    }
  }
}

export function* unclipSaga(action: ReturnType<typeof clippedActions.unclip>) {
  const { search, clipped }: RootState = yield select(getState);
  try {
    const nextClippedNews: NewsItem[] = yield call(
      clippedService.unclip,
      clipped.data,
      action.payload
    );

    const newData = search.data.map((news) =>
      news.id === action.payload ? { ...news, clipped: !news.clipped } : news
    );

    yield put(clippedActions.unclipSuccess(nextClippedNews));
    yield put(searchActions.updateData(newData));
  } catch (e: any) {
    yield put(clippedActions.unclipError(e));
  }
}

export default function* clippedSaga() {
  yield call(getClippedNewsSaga);
  yield takeLatest(clippedActions.unclip.type, unclipSaga);
}
