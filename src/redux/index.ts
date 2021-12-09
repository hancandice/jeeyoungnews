import { combineReducers } from "redux";
import inventory from "../modules/inventory/reducer";
import news from "../modules/news/reducer";

const AppReducer = combineReducers({
  inventory,
  news,
});

export default AppReducer;

export type RootState = ReturnType<typeof AppReducer>;
