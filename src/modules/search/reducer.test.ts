import dummyData from "../../utils/DummyData";
import search, { initialState, searchActions } from "./reducer";

describe("search reducer", () => {
  it("has initial state", () => {
    expect(search(undefined, { type: "@@INIT" })).toEqual(initialState);
  });

  it("handles receiveSearchHistory", () => {
    const state = search(
      initialState,
      searchActions.receiveSearchHistory(dummyData.searchHistory)
    );
    expect(state).toEqual({
      ...initialState,
      loading: false,
      searchHistory: dummyData.searchHistory,
    });
  });

  it("handles fetchNewsWithKeyword", () => {
    const state = search(
      initialState,
      searchActions.fetchNewsWithKeyword({
        keyword: dummyData.searchHistory[0],
        first: true,
      })
    );
    expect(state).toEqual({ ...initialState, loading: true });
  });

  it("handles fetchNewsWithKeywordSuccess", () => {
    const state = search(
      initialState,
      searchActions.fetchNewsWithKeywordSuccess(dummyData.searchData)
    );
    expect(state).toEqual({
      ...initialState,
      loading: false,
      data: dummyData.searchData,
    });
  });

  it("handles fetchNewsWithKeywordError", () => {
    const error: Error = new Error();
    const state = search(
      initialState,
      searchActions.fetchNewsWithKeywordError(error)
    );
    expect(state).toEqual({
      ...initialState,
      loading: false,
      error,
    });
  });

  const newKeyword = "Jeeyoung";

  it("handles addSearchKeyword", () => {
    const state = search(
      initialState,
      searchActions.addSearchKeyword(newKeyword)
    );
    expect(state).toEqual({ ...initialState, loading: true });
  });

  it("handles addSearchKeywordSuccess", () => {
    const state = search(
      initialState,
      searchActions.addSearchKeywordSuccess(
        dummyData.searchHistory.concat(newKeyword)
      )
    );
    expect(state).toEqual({
      ...initialState,
      loading: false,
      searchHistory: dummyData.searchHistory.concat(newKeyword),
    });
  });

  it("handles addSearchKeywordError", () => {
    const error: Error = new Error();
    const state = search(
      initialState,
      searchActions.addSearchKeywordError(error)
    );
    expect(state).toEqual({
      ...initialState,
      loading: false,
      error,
    });
  });

  it("handles clip", () => {
    const state = search(
      initialState,
      searchActions.clip(dummyData.searchData[0])
    );
    expect(state).toEqual({ ...initialState, loading: true });
  });

  it("handles clipError", () => {
    const error: Error = new Error();
    const state = search(initialState, searchActions.clipError(error));
    expect(state).toEqual({
      ...initialState,
      loading: false,
      error,
    });
  });

  it("handles updateData", () => {
    const state = search(
      initialState,
      searchActions.updateData(
        dummyData.clippedData.concat(dummyData.searchData)
      )
    );
    expect(state).toEqual({
      ...initialState,
      loading: false,
      data: dummyData.clippedData.concat(dummyData.searchData),
    });
  });
});
