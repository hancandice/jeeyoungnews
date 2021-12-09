import { applyMiddleware, createStore } from "redux";
import createSagaMiddleware from "redux-saga";
import AppReducer from "..";
import rootSaga from "../../sagas/rootSaga";

const saga = createSagaMiddleware();

const configureStore = () => {
  console.log("Prod Mode");
  const middlewares = [saga];
  const store = createStore(AppReducer, applyMiddleware(...middlewares));

  saga.run(rootSaga);
  return store;
};

export default configureStore;
