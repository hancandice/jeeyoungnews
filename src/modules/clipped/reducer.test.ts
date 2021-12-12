import dummyData from "../../utils/DummyData";
import clipped, { clippedActions, initialState } from "./reducer";

describe("clipped reducer", () => {
  it("has initial state", () => {
    expect(clipped(undefined, { type: "@@INIT" })).toEqual(initialState);
  });

  it("handles receiveClippedNews", () => {
    const state = clipped(
      initialState,
      clippedActions.receiveClippedNews(dummyData.clippedData)
    );
    expect(state.loading === false).toBeTruthy();
    expect(state.error === null).toBeTruthy();
    expect(state.data === dummyData.clippedData).toBeTruthy();
  });

  it("handles unclip", () => {
    const state = clipped(
      initialState,
      clippedActions.unclip(dummyData.clippedData[0].id)
    );
    expect(state).toEqual({ ...initialState, loading: true });
  });

  it("handles unclipSuccess", () => {
    const state = clipped(
      initialState,
      clippedActions.unclipSuccess(
        dummyData.clippedData.filter(
          (clipped) => clipped.id !== dummyData.clippedData[0].id
        )
      )
    );
    expect(state).toEqual({
      loading: false,
      error: null,
      data: dummyData.clippedData.slice(1),
    });
  });

  it("handles unclipError", () => {
    const error: Error = new Error();
    const state = clipped(initialState, clippedActions.unclipError(error));
    expect(state).toEqual({ loading: false, error, data: [] });
  });
});
