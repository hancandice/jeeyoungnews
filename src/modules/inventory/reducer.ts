import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { InventoryItem } from "../../service/inventory";
import { InventoryState } from "./types";

export const initialState: InventoryState = {
  loading: true,
  error: null,
  data: [],
};

const inventorySlice = createSlice({
  name: "inventory",
  initialState,
  reducers: {
    receiveItems(state, action: PayloadAction<InventoryItem[]>) {
      state.loading = false;
      state.data = action.payload;
    },
    addItem(state, action: PayloadAction<InventoryItem>) {
      state.loading = true;
    },
    addItemSuccess(state, action: PayloadAction<InventoryItem[]>) {
      state.loading = false;
      state.data = action.payload;
    },
    addItemError(state, action: PayloadAction<any>) {
      state.loading = false;
      state.error = action.payload;
    },
  },
});

export const inventoryActions = inventorySlice.actions;
export default inventorySlice.reducer;

// reducer: inventorySlice.reducer

// action creators:
// - inventorySlice.actions.receiveItems,
// - inventorySlice.actions.addItem,
// - inventorySlice.actions.addItemSuccess,
// - inventorySlice.actions.addItemError

// actionType:
// - inventorySlice.actions.receiveItems.type: 'inventory/receiveItems'
// - inventorySlice.actions.addItem.type: 'inventory/addItem'
// - inventorySlice.actions.addItemSuccess.type: 'inventory/addItemSuccess'
// - inventorySlice.actions.addItemError.type: 'inventory/addItemError'
