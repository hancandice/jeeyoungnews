import { combineReducers } from "redux";
import inventory from "../modules/inventory/reducer";

const AppReducer = combineReducers({
  inventory,
});

export default AppReducer;

export type RootState = ReturnType<typeof AppReducer>;
