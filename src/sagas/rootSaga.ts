import { all, fork } from "redux-saga/effects";
import clippedSaga from "../modules/clipped/saga";
import searchSaga from "../modules/search/sagas";

export default function* rootSaga() {
  yield all([fork(searchSaga), fork(clippedSaga)]);
}
