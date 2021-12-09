import { all, fork } from "redux-saga/effects";
import inventorySaga from "../modules/inventory/sagas";
import newsSaga from "../modules/news/sagas";

export default function* rootSaga() {
  yield all([fork(newsSaga), fork(inventorySaga)]);
}
