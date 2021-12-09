import { all, fork } from "redux-saga/effects";
import inventorySaga from "../modules/inventory/sagas";

export default function* rootSaga() {
  yield all([fork(inventorySaga)]);
}
