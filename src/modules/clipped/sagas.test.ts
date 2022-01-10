import { Action } from "redux";
import { runSaga, Saga } from "redux-saga";
import { select, takeLatest } from "redux-saga/effects";
import clippedService from "../../service/clippedService";
import dummyData from "../../utils/DummyData";
import getState from "../getState";
import { initialState, searchActions } from "../search/reducer";
import { clippedActions, initialState as clippedInitialState } from "./reducer";
import clippedSaga, { getClippedNewsSaga, unclipSaga } from "./sagas";

describe("clippedSaga", () => {
  const genObject: Generator = clippedSaga();

  it("should call getClippedNewsSaga first", () => {
    expect(genObject.next().value.payload.fn).toEqual(getClippedNewsSaga);
  });

  it("should wait for latest clippedActions.unclip action and call unclipSaga", () => {
    expect(genObject.next().value).toEqual(
      takeLatest(clippedActions.unclip.type, unclipSaga)
    );
  });

  it("should be done on next iteration", () => {
    expect(genObject.next().done).toBeTruthy();
  });
});

describe("getClippedNewsSaga", () => {
  const genObject: Generator = getClippedNewsSaga();

  it("calls clippedService.getClippedNews", () => {
    expect(genObject.next().value.payload.fn).toEqual(
      clippedService.getClippedNews
    );
  });

  it("should call clippedService.getClippedNews and dispatch receiveClippedNews action", async () => {
    const getClippedNews = jest
      .spyOn(clippedService, "getClippedNews")
      .mockImplementation(() => Promise.resolve(dummyData.clippedData));
    const dispatched: Action[] = [];
    await runSaga(
      {
        dispatch: (action: Action) => dispatched.push(action),
      },
      getClippedNewsSaga as Saga
    );

    expect(getClippedNews).toHaveBeenCalledTimes(1);
    expect(dispatched[0]).toEqual(
      clippedActions.receiveClippedNews(dummyData.clippedData)
    );
    getClippedNews.mockClear();
  });

  it("should call clippedService.getClippedNews and dispatch delay action", async () => {
    const getClippedNews = jest
      .spyOn(clippedService, "getClippedNews")
      .mockImplementation(() => Promise.resolve(null));
    const dispatched: Action[] = [];
    await runSaga(
      {
        dispatch: (action: Action) => dispatched.push(action),
      },
      getClippedNewsSaga as Saga
    );

    expect(getClippedNews).toHaveBeenCalledTimes(1);
    expect(dispatched).toEqual([]);
    getClippedNews.mockClear();
  });
});

describe("unclipSaga", () => {
  const newsItemId: string = dummyData.clippedData[0].id;
  const genObject = unclipSaga(clippedActions.unclip(newsItemId));

  it("should yield an effect 'select(state => state)'", () => {
    expect(genObject.next().value).toEqual(select(getState));
  });

  it("should call clippedService.unclip and dispatch unclipSuccess action", async () => {
    const unclip = jest
      .spyOn(clippedService, "unclip")
      .mockImplementation(() => Promise.resolve([dummyData.clippedData[1]]));
    const dispatched: Action[] = [];
    await runSaga(
      {
        getState: () => ({
          search: {
            ...initialState,
            data: dummyData.searchData
              .filter(
                (el) =>
                  !dummyData.clippedData
                    .map((clipped) => clipped.id)
                    .includes(el.id)
              )
              .concat(dummyData.clippedData),
          },
          clipped: {
            ...clippedInitialState,
            data: dummyData.clippedData,
          },
        }),
        dispatch: (action: Action) => dispatched.push(action),
      },
      unclipSaga as Saga,
      clippedActions.unclip(newsItemId)
    );

    expect(unclip).toHaveBeenCalledTimes(1);
    expect(dispatched[0]).toEqual(
      clippedActions.unclipSuccess([dummyData.clippedData[1]])
    );
    expect(dispatched[1]).toEqual(
      searchActions.updateData(
        dummyData.searchData
          .filter(
            (el) =>
              ![dummyData.clippedData[1]]
                .map((clipped) => clipped.id)
                .includes(el.id)
          )
          .concat([dummyData.clippedData[1]])
      )
    );
    unclip.mockClear();
  });

  it("should call clippedService.unclip and dispatch unclipError action", async () => {
    const err = TypeError();
    const unclip = jest
      .spyOn(clippedService, "unclip")
      .mockImplementation(() => Promise.reject(err));
    const dispatched: Action[] = [];
    await runSaga(
      {
        getState: () => ({
          search: {
            ...initialState,
            data: dummyData.searchData
              .filter(
                (el) =>
                  !dummyData.clippedData
                    .map((clipped) => clipped.id)
                    .includes(el.id)
              )
              .concat(dummyData.clippedData),
          },
          clipped: {
            ...clippedInitialState,
            data: dummyData.clippedData,
          },
        }),
        dispatch: (action: Action) => dispatched.push(action),
      },
      unclipSaga as Saga,
      clippedActions.unclip(newsItemId)
    );

    expect(unclip).toHaveBeenCalledTimes(1);
    expect(dispatched[0]).toEqual(clippedActions.unclipError(err));
    unclip.mockClear();
  });
});
