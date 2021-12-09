import { applyMiddleware, compose, createStore } from "redux";
import { createLogger } from "redux-logger";
import createSagaMiddleware from "redux-saga";
import AppReducer from "..";
import rootSaga from "../../sagas/rootSaga";
import { composeWithDevTools } from "redux-devtools-extension";

const saga = createSagaMiddleware();

const configureStore = () => {
  console.log("Dev Mode");
  const logger = createLogger();
  const middlewares = [saga, logger];
  const store = createStore(
    AppReducer,
    composeWithDevTools(applyMiddleware(...middlewares))
  );

  saga.run(rootSaga);

  return store;
};

export default configureStore;
