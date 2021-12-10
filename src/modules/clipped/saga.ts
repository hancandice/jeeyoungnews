import { delay, put, select, takeLatest } from "@redux-saga/core/effects";
import { call } from "redux-saga/effects";
import { RootState } from "../../redux";
import clippedService from "../../service/clippedService";
import { NewsItem } from "../search/types";
import { clippedActions } from "./reducer";
import { ClippedState } from "./types";

export const getClipped = (state: RootState) => state.clipped;

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
  const { data }: ClippedState = yield select(getClipped);
  try {
    const nextClippedNews: NewsItem[] = yield call(
      clippedService.unclip,
      data,
      action.payload
    );
    yield put(clippedActions.unclipSuccess(nextClippedNews));
  } catch (e: any) {
    yield put(clippedActions.unclipError(e));
  }
}

export default function* clippedSaga() {
  yield call(getClippedNewsSaga);
  yield takeLatest(clippedActions.unclip.type, unclipSaga);
}
