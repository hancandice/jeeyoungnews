import { nanoid } from "@reduxjs/toolkit";
import { InventoryItem } from "../../service/inventory";
import dummyData from "../../utils/DummyData";
import inventory, { initialState, inventoryActions } from "./reducer";

describe("inventory reducer", () => {
  it("has initial state", () => {
    expect(inventory(undefined, { type: "@@INIT" })).toEqual(initialState);
  });

  it("handles receiveItems", () => {
    const state = inventory(
      initialState,
      inventoryActions.receiveItems(dummyData.inventoryData)
    );
    expect(state.loading === false).toBeTruthy();
    expect(state.error === null).toBeTruthy();
    expect(state.data === dummyData.inventoryData).toBeTruthy();
    expect(state.data[0].name === "Cartier ring").toBeTruthy();
  });

  const sampleData: InventoryItem = {
    id: 1,
    name: "Gold ring",
    purchasePrice: "4000",
    type: "JEWELRY",
    description: "Gift from my mom",
    photo: "https://i.ibb.co/znXC7LQ/marcus-lewis-U63z-XX2f7ho-unsplash.jpg",
  };

  it("handles addItem", () => {
    const state = inventory(initialState, inventoryActions.addItem(sampleData));
    expect(state).toEqual({ ...initialState, loading: true });
  });

  it("handles addItemSuccess", () => {
    const state = inventory(
      initialState,
      inventoryActions.addItemSuccess(
        dummyData.inventoryData.concat(sampleData)
      )
    );
    expect(state).toEqual({
      loading: false,
      error: null,
      data: dummyData.inventoryData.concat(sampleData),
    });
  });

  it("handles addItemError", () => {
    const error: Error = new Error();
    const state = inventory(initialState, inventoryActions.addItemError(error));
    expect(state).toEqual({ loading: false, error, data: [] });
  });
});
