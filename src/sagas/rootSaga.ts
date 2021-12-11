import { all, fork } from "redux-saga/effects";
import searchSaga from "../modules/search/sagas";
import clippedSaga from "../modules/clipped/sagas";

export default function* rootSaga() {
  yield all([fork(searchSaga), fork(clippedSaga)]);
}
