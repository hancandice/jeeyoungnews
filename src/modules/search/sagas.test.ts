import { runSaga, Saga } from "redux-saga";
import { select, takeLatest } from "redux-saga/effects";
import searchService from "../../service/searchService";
import dummyData from "../../utils/DummyData";
import getState from "../getState";
import { initialState, searchActions } from "./reducer";
import {
  clippedActions,
  initialState as clippedInitialState,
} from "../clipped/reducer";
import searchSaga, {
  addSearchKeywordSaga,
  clipSaga,
  fetchNewsWithKeywordSaga,
  getSearchHistorySaga,
} from "./sagas";
import { NewsItem, SearchNewsPayloads } from "./types";
import { Action } from "redux";

describe("searchSaga", () => {
  const genObject: Generator = searchSaga();

  it("should call getSearchHistorySaga first", () => {
    expect(genObject.next().value.payload.fn).toEqual(getSearchHistorySaga);
  });

  it("should wait for latest searchActions.fetchNewsWithKeyword action and call fetchNewsWithKeywordSaga", () => {
    expect(genObject.next().value).toEqual(
      takeLatest(
        searchActions.fetchNewsWithKeyword.type,
        fetchNewsWithKeywordSaga
      )
    );
  });

  it("should wait for latest searchActions.addSearchKeyword action and call addSearchKeywordSaga", () => {
    expect(genObject.next().value).toEqual(
      takeLatest(searchActions.addSearchKeyword.type, addSearchKeywordSaga)
    );
  });

  it("should wait for latest searchActions.clip action and call clipSaga", () => {
    expect(genObject.next().value).toEqual(
      takeLatest(searchActions.clip.type, clipSaga)
    );
  });

  it("should be done on next iteration", () => {
    expect(genObject.next().done).toBeTruthy();
  });
});

describe("getSearchHistorySaga", () => {
  const genObject: Generator = getSearchHistorySaga();

  it("calls searchService.getSearchHistory", () => {
    expect(genObject.next().value.payload.fn).toEqual(
      searchService.getSearchHistory
    );
  });

  it("should call searchService.getSearchHistory and dispatch receiveSearchHistory action", async () => {
    const getSearchHistory = jest
      .spyOn(searchService, "getSearchHistory")
      .mockImplementation(() => Promise.resolve(dummyData.searchHistory));
    const dispatched: Action[] = [];
    await runSaga(
      {
        dispatch: (action: Action) => dispatched.push(action),
      },
      getSearchHistorySaga as Saga
    );

    expect(getSearchHistory).toHaveBeenCalledTimes(1);
    expect(dispatched[0]).toEqual(
      searchActions.receiveSearchHistory(dummyData.searchHistory)
    );
    getSearchHistory.mockClear();
  });

  it("should call searchService.getSearchHistory and dispatch delay action", async () => {
    const getSearchHistory = jest
      .spyOn(searchService, "getSearchHistory")
      .mockImplementation(() => Promise.resolve(null));
    const dispatched: Action[] = [];
    await runSaga(
      {
        dispatch: (action: Action) => dispatched.push(action),
      },
      getSearchHistorySaga as Saga
    );

    expect(getSearchHistory).toHaveBeenCalledTimes(1);
    expect(dispatched).toEqual([]);
    getSearchHistory.mockClear();
  });
});

describe("fetchNewsWithKeywordSaga", () => {
  const firstRequest: SearchNewsPayloads = {
    keyword: dummyData.searchHistory[0],
    first: true,
  };
  const secondRequest: SearchNewsPayloads = {
    keyword: dummyData.searchHistory[0],
    first: false,
  };
  const otherRequest: SearchNewsPayloads = {
    keyword: dummyData.searchHistory[1],
    first: true,
  };

  const genObject = fetchNewsWithKeywordSaga(
    searchActions.fetchNewsWithKeyword(firstRequest)
  );

  it("should yield an effect 'select(state => state)'", () => {
    expect(genObject.next().value).toEqual(select(getState));
  });

  it("should call searchService.fetchNewsWithKeyword and dispatch fetchNewsWithKeywordSuccess action", async () => {
    const fetchNewsWithKeyword = jest
      .spyOn(searchService, "fetchNewsWithKeyword")
      .mockImplementation(() => Promise.resolve(dummyData.searchData));

    const dispatched: Action[] = [];

    await runSaga(
      {
        getState: () => ({
          search: initialState,
          clipped: clippedInitialState,
        }),
        dispatch: (action: Action) => dispatched.push(action),
      },
      fetchNewsWithKeywordSaga as Saga,
      searchActions.fetchNewsWithKeyword(firstRequest)
    );

    expect(fetchNewsWithKeyword).toHaveBeenCalledTimes(1);
    expect(dispatched[0]).toEqual(
      searchActions.fetchNewsWithKeywordSuccess(dummyData.searchData)
    );
    expect(dispatched[1]).toEqual(
      searchActions.addSearchKeyword(firstRequest.keyword)
    );

    await runSaga(
      {
        getState: () => ({
          search: {
            ...initialState,
            data: dummyData.searchData,
            searchHistory: [firstRequest.keyword],
          },
          clipped: {
            ...clippedInitialState,
            data: dummyData.clippedData,
          },
        }),
        dispatch: (action: Action) => dispatched.push(action),
      },
      fetchNewsWithKeywordSaga as Saga,
      searchActions.fetchNewsWithKeyword(secondRequest)
    );

    const addedData: NewsItem[] = dummyData.searchData.concat(
      dummyData.searchData
        .filter(
          (el) =>
            !dummyData.clippedData.map((clipped) => clipped.id).includes(el.id)
        )
        .concat(dummyData.clippedData)
    );

    expect(fetchNewsWithKeyword).toHaveBeenCalledTimes(2);
    expect(dispatched[2]).toEqual(
      searchActions.fetchNewsWithKeywordSuccess(addedData)
    );

    await runSaga(
      {
        getState: () => ({
          search: {
            ...initialState,
            data: addedData,
            searchHistory: [firstRequest.keyword],
          },
          clipped: {
            ...clippedInitialState,
            data: dummyData.clippedData,
          },
        }),
        dispatch: (action: Action) => dispatched.push(action),
      },
      fetchNewsWithKeywordSaga as Saga,
      searchActions.fetchNewsWithKeyword(otherRequest)
    );

    expect(fetchNewsWithKeyword).toHaveBeenCalledTimes(3);
    expect(dispatched[3]).toEqual(
      searchActions.fetchNewsWithKeywordSuccess(
        dummyData.searchData
          .filter(
            (el) =>
              !dummyData.clippedData
                .map((clipped) => clipped.id)
                .includes(el.id)
          )
          .concat(dummyData.clippedData)
      )
    );
    expect(dispatched[4]).toEqual(
      searchActions.addSearchKeyword(otherRequest.keyword)
    );
    fetchNewsWithKeyword.mockClear();
  });

  it("should call searchService.fetchNewsWithKeyword and dispatch fetchNewsWithKeywordError and delay action", async () => {
    const err = TypeError();
    const fetchNewsWithKeyword = jest
      .spyOn(searchService, "fetchNewsWithKeyword")
      .mockImplementation(() => Promise.reject(err));

    const dispatched: Action[] = [];

    await runSaga(
      {
        getState: () => ({
          search: initialState,
          clipped: clippedInitialState,
        }),
        dispatch: (action: Action) => dispatched.push(action),
      },
      fetchNewsWithKeywordSaga as Saga,
      searchActions.fetchNewsWithKeyword(firstRequest)
    );

    expect(fetchNewsWithKeyword).toHaveBeenCalledTimes(1);
    expect(dispatched[0]).toEqual(searchActions.fetchNewsWithKeywordError(err));
    fetchNewsWithKeyword.mockClear();
  });
});

describe("addSearchKeywordSaga", () => {
  const searchKeyword = dummyData.searchHistory[0];
  const genObject = addSearchKeywordSaga(
    searchActions.addSearchKeyword(searchKeyword)
  );

  it("should yield an effect 'select(state => state)'", () => {
    expect(genObject.next().value).toEqual(select(getState));
  });

  it("should call searchService.addSearchKeyword and dispatch addSearchKeywordSuccess action", async () => {
    const addSearchKeyword = jest
      .spyOn(searchService, "addSearchKeyword")
      .mockImplementation(() => Promise.resolve([searchKeyword]));
    const dispatched: Action[] = [];
    await runSaga(
      {
        getState: () => ({
          search: initialState,
          clipped: clippedInitialState,
        }),
        dispatch: (action: Action) => dispatched.push(action),
      },
      addSearchKeywordSaga as Saga,
      searchActions.addSearchKeyword(searchKeyword)
    );

    expect(addSearchKeyword).toHaveBeenCalledTimes(1);
    expect(dispatched[0]).toEqual(
      searchActions.addSearchKeywordSuccess([searchKeyword])
    );
    addSearchKeyword.mockClear();
  });

  it("should call searchService.addSearchKeyword and dispatch addSearchKeywordError action", async () => {
    const err = TypeError();
    const addSearchKeyword = jest
      .spyOn(searchService, "addSearchKeyword")
      .mockImplementation(() => Promise.reject(err));
    const dispatched: Action[] = [];
    await runSaga(
      {
        getState: () => ({
          search: initialState,
          clipped: clippedInitialState,
        }),
        dispatch: (action: Action) => dispatched.push(action),
      },
      addSearchKeywordSaga as Saga,
      searchActions.addSearchKeyword(searchKeyword)
    );

    expect(addSearchKeyword).toHaveBeenCalledTimes(1);
    expect(dispatched[0]).toEqual(searchActions.addSearchKeywordError(err));
    addSearchKeyword.mockClear();
  });
});

describe("clipSaga", () => {
  const newsItem: NewsItem = dummyData.searchData[0];
  const genObject = clipSaga(searchActions.clip(newsItem));

  it("should yield an effect 'select(state => state)'", () => {
    expect(genObject.next().value).toEqual(select(getState));
  });

  it("should call searchService.clip and dispatch receiveClippedNews action", async () => {
    const clip = jest
      .spyOn(searchService, "clip")
      .mockImplementation(() =>
        Promise.resolve([{ ...newsItem, clipped: true }])
      );
    const dispatched: Action[] = [];
    await runSaga(
      {
        getState: () => ({
          search: { ...initialState, data: dummyData.searchData },
          clipped: clippedInitialState,
        }),
        dispatch: (action: Action) => dispatched.push(action),
      },
      clipSaga as Saga,
      searchActions.clip(newsItem)
    );

    expect(clip).toHaveBeenCalledTimes(1);
    expect(dispatched[0]).toEqual(
      clippedActions.receiveClippedNews([{ ...newsItem, clipped: true }])
    );
    expect(dispatched[1]).toEqual(
      searchActions.updateData(
        [{ ...newsItem, clipped: true }].concat(dummyData.searchData.slice(1))
      )
    );
    clip.mockClear();
  });

  it("should call searchService.clip and dispatch clipError action", async () => {
    const err = TypeError();
    const clip = jest
      .spyOn(searchService, "clip")
      .mockImplementation(() => Promise.reject(err));
    const dispatched: Action[] = [];
    await runSaga(
      {
        getState: () => ({
          search: { ...initialState, data: dummyData.searchData },
          clipped: clippedInitialState,
        }),
        dispatch: (action: Action) => dispatched.push(action),
      },
      clipSaga as Saga,
      searchActions.clip(newsItem)
    );

    expect(clip).toHaveBeenCalledTimes(1);
    expect(dispatched[0]).toEqual(searchActions.clipError(err));
    clip.mockClear();
  });
});
