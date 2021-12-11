import { RootState } from "../redux";

const getSearch = (state: RootState) => state.search;
const getClipped = (state: RootState) => state.clipped;

const getState = {
  getSearch,
  getClipped,
};

export default getState;
