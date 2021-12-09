import { runSaga, Saga } from "@redux-saga/core";
import { PayloadAction } from "@reduxjs/toolkit";
import { select, takeLatest } from "redux-saga/effects";
import inventoryService from "../../service/inventory";
import dummyData from "../../utils/DummyData";
import { initialState, inventoryActions } from "../inventory/reducer";
import inventorySaga, {
  addItemSaga,
  getInventory,
  getInventoryItemsSaga,
} from "./sagas";

describe("inventorySaga", () => {
  const genObject = inventorySaga();

  it("should call getInventoryItemsSaga first", () => {
    expect(genObject.next().value!!.payload.fn).toEqual(getInventoryItemsSaga);
  });

  it("should wait for latest inventoryActions.addItem action and call addItemSaga", () => {
    expect(genObject.next().value).toEqual(
      takeLatest(inventoryActions.addItem.type, addItemSaga)
    );
  });

  it("should be done on next iteration", () => {
    expect(genObject.next().done).toBeTruthy();
  });
});

describe("getInventoryItemsSaga", () => {
  const genObject = getInventoryItemsSaga();

  it("should call inventoryService.getItems and dispatch receiveItems action", async () => {
    const dummyInventoryDatas = dummyData.inventoryData;
    const getItems = jest
      .spyOn(inventoryService, "getItems")
      .mockImplementation(() => Promise.resolve(dummyInventoryDatas));

    const dispatched: PayloadAction[] = [];
    await runSaga(
      {
        dispatch: (action: PayloadAction) => dispatched.push(action),
      },
      getInventoryItemsSaga as Saga<any[]>
    );

    expect(getItems).toHaveBeenCalledTimes(1);
    expect(dispatched[0]).toEqual(
      inventoryActions.receiveItems(dummyInventoryDatas)
    );
    getItems.mockClear();
  });

  it("should call inventoryService.getItems and dispatch delay action", async () => {
    const getItems = jest
      .spyOn(inventoryService, "getItems")
      .mockImplementation(() => Promise.resolve(null));

    const dispatched: PayloadAction[] = [];

    await runSaga(
      {
        dispatch: (action: PayloadAction) => dispatched.push(action),
      },
      getInventoryItemsSaga as Saga<any[]>
    );

    expect(getItems).toHaveBeenCalledTimes(1);
    expect(dispatched).toEqual([]);
    getItems.mockClear();
  });
});

describe("addItemSaga", () => {
  const dummyItem = dummyData.inventoryData[0];

  const genObject = addItemSaga(inventoryActions.addItem(dummyItem));
  it("should yield an effect 'select(state => state.inventory)'", () => {
    const effect = genObject.next().value;
    expect(effect).toEqual(select(getInventory));
  });

  it("should call inventoryService.addItem and dispatch addItemSuccess action", async () => {
    const addItem = jest
      .spyOn(inventoryService, "addItem")
      .mockImplementation(() => Promise.resolve([dummyItem]));

    const dispatched: PayloadAction[] = [];

    await runSaga(
      {
        getState: () => ({ inventory: initialState }),
        dispatch: (action: PayloadAction) => dispatched.push(action),
      },
      addItemSaga as Saga<any[]>,
      inventoryActions.addItem(dummyItem)
    );

    expect(addItem).toHaveBeenCalledTimes(1);
    expect(dispatched[0]).toEqual(inventoryActions.addItemSuccess([dummyItem]));
    addItem.mockClear();
  });

  it("should call inventoryService.addItem and dispatch addItemError action", async () => {
    const addItem = jest
      .spyOn(inventoryService, "addItem")
      .mockImplementation(() => Promise.reject(new Error()));

    const dispatched: PayloadAction[] = [];

    await runSaga(
      {
        getState: () => ({ inventory: initialState }),
        dispatch: (action: PayloadAction) => dispatched.push(action),
      },
      addItemSaga as Saga<any[]>,
      inventoryActions.addItem(dummyItem)
    );

    expect(addItem).toHaveBeenCalledTimes(1);
    expect(dispatched[0]).toEqual(inventoryActions.addItemError(new Error()));
    addItem.mockClear();
  });
});
