import { combineReducers } from "redux";
import search from "../modules/search/reducer";
import clipped from "../modules/clipped/reducer";

const AppReducer = combineReducers({
  search,
  clipped,
});

export default AppReducer;

export type RootState = ReturnType<typeof AppReducer>;
